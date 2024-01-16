import { Router } from "express";
import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";

export const postRouter = Router();

postRouter.get("/", async (req, res) => {
  try {
    const collection = db.collection("posts");
    const allPosts = await collection.find({}).toArray();
    return res.json({ data: allPosts });
  } catch (err) {
    console.log(err);
  }
});

postRouter.post("/", async (req, res) => {
  const collection = db.collection("posts");
  const inputData = { ...req.body };
  const newData = { ...inputData };

  if (!newData.topic || !newData.description || !newData.tag)
    return res.json({
      message: "please make sure you include 'topic' 'description' and 'tag'",
      newData,
    });

  const newPost = await collection.insertOne(newData);
  return res.json({
    Message: "your post has been created succesfully",
    data: newData,
  });
});

postRouter.get("/:postid", async (req, res) => {
  const collection = db.collection("posts");
  const id = new ObjectId(req.params.postid);
  const post = await collection.findOne({ _id: id });
  return res.json({ data: post });
});

postRouter.delete("/:postid", async (req, res) => {
  const collection = db.collection("posts");
  const id = new ObjectId(req.params.postid);

  const post = await collection.findOne({ _id: id });
  if (!post)
    return res.json({ mesaage: "please make sure your 'id' is right " });

  const deletePost = await collection.deleteOne({ _id: id });
  return res.json({ message: `Your post "${post.topic}" has been deleted` });
});
