const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Chat = mongoose.model("Chat");

router.get("/", (_req, res, _next) => {
  res.json({ message: "GET /users" });
});

router.post("/create", async (req, res, next) => {
  const { owner, ownerUsername, title, description } = req.body;

  const newChat = new Chat({
    owner,
    ownerUsername,
    title,
    description,
  });

  try {
    let saveNewChat = await newChat.save();
    return res.json(saveNewChat);
  } catch (err) {
    next(err);
  }
});

router.get("/all", async (req, res, next) => {
  const allChat = await Chat.find({});

  try {
    return res.json(allChat);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const chat = await Chat.findOne({
      _id: mongoose.Types.ObjectId(req.params.id),
    });
    return res.json(chat);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
