export function reply(
  res: any,
  statusCode: number,
  data: any,
  headers: Record<string, string> = {}
) {
  const payload = JSON.stringify(data);
  if (res && typeof res.status === "function" && typeof res.json === "function") {
    for (const [k, v] of Object.entries(headers)) {
      res.setHeader(k, v);
    }
    res.status(statusCode).json(data);
    return;
  }
  if (res && typeof res.setHeader === "function" && typeof res.end === "function") {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    for (const [k, v] of Object.entries(headers)) {
      res.setHeader(k, v);
    }
    res.end(payload);
    return;
  }
  return new Response(payload, {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}

export async function parseBody(req: any): Promise<any> {
  if (!req) return {};

  // 1. Pre-parsed JavaScript object (Express / Vercel body-parser) - check FIRST
  if (
    req.body &&
    typeof req.body === "object" &&
    typeof req.body.pipe !== "function" &&
    typeof req.body.getReader !== "function"
  ) {
    return req.body;
  }

  // 2. String body
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  // 3. Web Standard Request with .json() method (Vercel Edge / Web Route)
  if (typeof req.json === "function") {
    try {
      return await req.json();
    } catch {
      // fallback
    }
  }

  // 4. Web Standard Request with .text() method
  if (typeof req.text === "function") {
    try {
      const text = await req.text();
      return text ? JSON.parse(text) : {};
    } catch {
      return {};
    }
  }

  // 5. If stream already ended without body
  if (req.readableEnded || req.complete) {
    return {};
  }

  // 6. Node.js IncomingMessage stream with timeout safety
  if (typeof req.on === "function") {
    return new Promise((resolve) => {
      let data = "";
      const timer = setTimeout(() => resolve({}), 2000);

      req.on("data", (chunk: any) => {
        data += chunk;
      });
      req.on("end", () => {
        clearTimeout(timer);
        try {
          resolve(data ? JSON.parse(data) : {});
        } catch {
          resolve({});
        }
      });
      req.on("error", () => {
        clearTimeout(timer);
        resolve({});
      });
    });
  }

  return {};
}
