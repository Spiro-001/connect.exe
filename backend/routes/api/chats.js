const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Message = require("../../models/Message");
const Chat = mongoose.model("Chat");

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const upload = require("./common");

const { uploadFile, getFileStream, deleteFile } = require("../../s3");
const multer = require("multer");

// AWS COMMANDS

router.post("/image/upload", upload.single("image"), async (req, res, next) => {
  const result = await uploadFile(req.file);
  await unlinkFile(req.file.path);
  res.send({
    status: "success",
    message: "File uploaded successfully",
    data: req.file,
  });
});

router.get("/image/:key", (req, res, next) => {
  try {
    const key = req.params.key;

    if (key) {
      const readStream = getFileStream(key);
      console.log(readStream);
      return readStream.pipe(res); // this line will make image readable
    } else {
      return;
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/image/delete/:key", async (req, res, next) => {
  try {
    const key = req.params.key;
    const result = await deleteFile(key);
    return res.json(result);
  } catch (err) {
    next(err);
  }
});

//

router.get("/", (_req, res, _next) => {
  res.json({ message: "GET /users" });
});

router.post("/create", upload.single("image"), async (req, res, next) => {
  const {
    owner,
    ownerUsername,
    title,
    description,
    logo,
    password,
    tags,
    visible,
  } = req.body;

  console.log(visible);

  const newChat = new Chat({
    owner,
    ownerUsername,
    title,
    description,
    logo,
    password,
    tags,
    visible,
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
  const { owner, ownerUsername, title, description, logo, password, tags } =
    req.body;
  try {
    const editChat = await Chat.findByIdAndUpdate(
      { _id: req.params.id },
      { title, description, logo }
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
