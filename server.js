const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public"));

app.get("/api/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send("Missing 'url' parameter.");
  }

  try {
    const response = await fetch(targetUrl);
    const contentType = response.headers.get("content-type");
    res.setHeader("Content-Type", contentType);
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error("Proxy error:", error.message);
    res.status(500).send("Proxy error: " + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
