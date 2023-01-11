const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Message = require("../../models/Message");
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

router.patch("/edit/:id", async (req, res, next) => {
  try {
    const editChat = await Chat.findByIdAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, description: req.body.description }
    );
    return res.json(editChat);
  } catch (err) {
    next(err);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    Message.deleteMany({ chat: req.params.id }, (err, message) => {
      if (err) {
        next(err);
      } else {
        Chat.findOneAndDelete({ _id: req.params.id }, (err, chat) => {
          if (err) {
            next(err);
          } else {
            return res.json({ chat, message });
          }
        });
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
