/**
 * Universal adapter to allow Vercel Serverless Functions to handle both
 * Node.js (req, res) format and Web standard (Request) -> Response format seamlessly.
 */

export async function toStandardRequest(req: any): Promise<Request> {
  // If it's already a Web API Request instance
  if (typeof Request !== "undefined" && req instanceof Request) {
    return req;
  }

  const protocol = req?.headers?.["x-forwarded-proto"] || "https";
  const host =
    req?.headers?.["x-forwarded-host"] || req?.headers?.host || "localhost";
  const rawUrl = req?.url || "/";
  const url = new URL(rawUrl, `${protocol}://${host}`);

  const headers = new Headers();
  for (const [key, value] of Object.entries(req?.headers || {})) {
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else if (value !== undefined) {
      headers.set(key, String(value));
    }
  }

  const method = (req?.method || "GET").toUpperCase();
  let body: any = undefined;

  if (method !== "GET" && method !== "HEAD") {
    if (typeof req?.body === "string" || Buffer.isBuffer(req?.body)) {
      body = req.body;
    } else if (req?.body && typeof req?.body === "object") {
      body = JSON.stringify(req.body);
    }
  }

  return new Request(url.toString(), {
    method,
    headers,
    body,
  });
}

export async function sendNodeResponse(res: any, response: Response): Promise<void> {
  if (!res || typeof res.status !== "function") return;

  res.status(response.status);
  response.headers.forEach((val, key) => {
    res.setHeader(key, val);
  });

  const text = await response.text();
  res.end(text);
}
