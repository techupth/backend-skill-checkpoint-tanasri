import express from "express";
import cors from "cors";
import { client } from "./utils/db.js";
import { postRouter } from "./app/postRouter.js";

async function init() {
  await client.connect();
  const app = express();
  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  const port = 4000;

  app.use("/posts", postRouter);

  app.get("/", (req, res) => {
    return res.json("Hello Skill Checkpoint #2");
  });

  app.get("*", (req, res) => {
    return res.status(404).json("Not found");
  });

  app.get("/posts", async (req, res) => {
    const collection = db.collection("posts");
    console.log(1);
    try {
      console.log("1");
      const allPosts = await collection.find({}).toArray();
      return res.json({ data: allPosts });
    } catch (err) {
      console.log(err);
    }
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();
