export async function bridgeHandler(
  req: any,
  res: any,
  handler: (request: Request, action: string) => Promise<Response>
) {
  // If called directly as Web standard fetch: handler(Request)
  if (req instanceof Request && !res) {
    const url = new URL(req.url);
    const action = url.pathname.split("/").pop() || "";
    return await handler(req, action);
  }

  // Node (req, res) environment on Vercel
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

  // Build standard Request object
  let body: any = null;
  const method = (req.method || "GET").toUpperCase();
  if (method !== "GET" && method !== "HEAD") {
    if (req.body) {
      body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    } else {
      // Buffer from stream
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
      }
      body = Buffer.concat(chunks).toString("utf-8");
    }
  }

  const webRequest = new Request(url.toString(), {
    method,
    headers: req.headers,
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
}
