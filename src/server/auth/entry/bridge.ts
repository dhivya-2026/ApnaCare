export async function bridgeHandler(
  req: any,
  res: any,
  handler: (request: Request, action: string) => Promise<Response>
) {
  try {
    // 1. If called directly as Web standard fetch: handler(Request)
    if (req instanceof Request && !res) {
      const url = new URL(req.url);
      const action = url.pathname.split("/").filter(Boolean).pop() || "";
      return await handler(req, action);
    }

    // 2. Node (req, res) environment on Vercel
    const host = req.headers?.host || "apna-care.vercel.app";
    const protocol = req.headers?.["x-forwarded-proto"] || "https";
    const url = new URL(req.url || "/", `${protocol}://${host}`);

    // Action from path or query parameter [action]
    let action = "";
    if (req.query && req.query.action) {
      action = Array.isArray(req.query.action) ? req.query.action[0] : req.query.action;
    } else {
      action = url.pathname.split("/").filter(Boolean).pop() || "";
    }

    // Build safe body from pre-parsed req.body or stream
    let body: string | undefined = undefined;
    const method = (req.method || "GET").toUpperCase();
    if (method !== "GET" && method !== "HEAD") {
      if (req.body) {
        body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
      } else {
        // Stream with 2000ms safety timeout
        try {
          const streamPromise = (async () => {
            const chunks: Buffer[] = [];
            for await (const chunk of req) {
              chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
            }
            return Buffer.concat(chunks).toString("utf-8");
          })();

          const timeoutPromise = new Promise<string>((resolve) =>
            setTimeout(() => resolve(""), 2000)
          );

          const result = await Promise.race([streamPromise, timeoutPromise]);
          if (result) body = result;
        } catch {
          body = undefined;
        }
      }
    }

    // Build clean sanitized headers (prevent Transfer-Encoding / Content-Length mismatch errors)
    const cleanHeaders = new Headers();
    if (req.headers) {
      for (const [k, v] of Object.entries(req.headers)) {
        if (
          typeof v === "string" &&
          !["host", "connection", "content-length", "transfer-encoding"].includes(k.toLowerCase())
        ) {
          cleanHeaders.set(k, v);
        }
      }
    }
    if (body) {
      cleanHeaders.set("Content-Type", "application/json");
      cleanHeaders.set("Content-Length", Buffer.byteLength(body, "utf-8").toString());
    }

    const webRequest = new Request(url.toString(), {
      method,
      headers: cleanHeaders,
      body: body ? body : undefined,
    });

    const webResponse = await handler(webRequest, action);

    // Send status
    res.statusCode = webResponse.status;

    // Send headers
    webResponse.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        res.setHeader("Set-Cookie", value);
      } else {
        res.setHeader(key, value);
      }
    });

    const text = await webResponse.text();
    res.end(text);
  } catch (err: any) {
    console.error("[BridgeHandler Error]:", err);
    try {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          success: false,
          error: err?.message || "Internal server error in auth bridge",
        })
      );
    } catch {
      // Stream may already be closed
    }
  }
}
