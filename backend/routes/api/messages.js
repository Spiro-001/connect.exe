const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Message = mongoose.model("Message");

router.get("/", (_req, res, _next) => {
  res.json({ message: "GET /users" });
});

router.post("/create/:chatroomid", async (req, res, next) => {
  const { author, authorName, body } = req.body;

  const newMessage = new Message({
    author,
    authorName,
    chat: req.params.chatroomid,
    body,
  });

  try {
    let saveNewMessage = await newMessage.save();
    return res.json(saveNewMessage);
  } catch (err) {
    next(err);
  }
});

router.get("/:chatroomid", async (req, res, next) => {
  try {
    const chatLog = await Message.find({ chat: req.params.chatroomid });
    return res.json(chatLog);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
