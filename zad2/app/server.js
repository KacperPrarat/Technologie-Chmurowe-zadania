const { createClient } = require("redis");
const redis = require("redis");
const express = require("express");

let messageCounter = 1;

const port = 3000;
const app = express();
app.use(express.json());

const redisClient = redis.createClient({
  url: "redis://db:6379",
});

async function redisConnect() {
  await redisClient.connect();
  console.log("Connected to redis");
}

redisConnect();

redisClient.on("error", (err) => {
  console.log("Error occured while connecting or accessing redis server");
});

app.put("/message", async (req, res) => {
  try {
    const mes = req.query.message;
    const key = messageCounter.toString();
    await redisClient.set(key, mes);
    messageCounter++;
    res.status(200).json({ res: "Message posted" });
  } catch (err) {
    console.error("Error while setting message:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/message", async (req, res) => {
  try {
    const key = req.query.key;
    const message = await redisClient.get(key);
    res.status(200).json({ mes: message });
  } catch (err) {
    console.error("Error while getting message:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
