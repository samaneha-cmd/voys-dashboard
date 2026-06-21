const calls = [];

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    const call = { ...req.body, receivedAt: new Date().toISOString() };
    calls.unshift(call);
    if (calls.length > 500) calls.pop();
    return res.status(200).json({ status: "ok" });
  }

  if (req.method === "GET") {
    return res.status(200).json(calls);
  }

  res.status(405).end();
}
