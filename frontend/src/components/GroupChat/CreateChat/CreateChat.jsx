import Chat from "./Chat/Chat";
import "./CreateChat.css";
import "../../Profile/Profile.css";
import "../GroupChatShow/GroupChatShow.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtFetch } from "../../../store/jwt";
import { useHistory } from "react-router-dom";
import { leaveChat } from "../../../store/chats";
import { WithContext as ReactTags } from "react-tag-input";

function CreateChat({ theme, socket }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileData, setFileData] = useState();
  const [password, setPassword] = useState("");
  const [tags, setTags] = useState([]);
  const [preview, setPreview] = useState();

  const [openLeftMenu, setOpenLeftMenu] = useState(0);
  const [allChat, setAllChats] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const chatId = useSelector((state) => state.chats?.chatId);

  const TAGS = [
    "Animal",
    "Music",
    "Video Games",
    "Coding",
    "Photography",
    "Books",
    "Dogs",
    "Cats",
  ];

  const suggestions = TAGS.map((tag) => {
    return {
      id: tag,
      text: tag,
    };
  });

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  useEffect(() => {
    fetch("/api/groupchats/all")
      .then((res) => res.json())
      .then((data) => setAllChats(data));
  }, []);

  useEffect(() => {
    socket.emit("chat-leave", {
      userId: user.username,
      chatroomId: chatId,
    });
    dispatch(leaveChat());
  }, []);

  useEffect(() => {
    if (!fileData) {
      setPreview(undefined);
      return;
    }
    const objectURL = URL.createObjectURL(fileData);
    setPreview(objectURL);
    return () => URL.revokeObjectURL(objectURL);
  }, [fileData]);

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0]);
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (idx) => {
    setTags(tags.filter((tag, index) => index !== idx));
  };

  const handleTagClick = (idx) => {};

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let logo;
    const data = new FormData();
    data.append("image", fileData);

    jwtFetch("/api/groupchats/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        logo = data.data.filename;
        jwtFetch("/api/groupchats/create", {
          method: "POST",
          body: JSON.stringify({
            owner: user._id,
            ownerUsername: user.username,
            title,
            description,
            logo,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setAllChats([...allChat, data]);
            setTitle("");
            setDescription("");
            history.push(`/groupchats/${data._id}`);
          });
      });
  };

  return (
    <div className="main-createchat" data-theme={theme}>
      <div className="create-chat">
        <div className="left-menu">
          <div className="title-groupchat">Open chat</div>
          <div className="open-chats">
            {allChat?.map((chatData) => {
              if (chatData.owner === user._id) {
                return <Chat chatData={chatData} key={chatData._id} />;
              }
            })}
          </div>
        </div>
        <form className="start-chat" onSubmit={handleOnSubmit}>
          <div className="top-start-chat">
            <div className="first-part">
              <input
                className="top-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title..."
              />
              <input
                className="top-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description..."
              />
              <input
                className="top-input"
                type="file"
                onChange={fileChangeHandler}
              />
            </div>
          </div>
          <div className="top-start-chat">
            <div className="second-part">
              <input
                className="top-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a password..."
              />
              <ReactTags
                classNames={{
                  tag: "tag",
                  tags: "react-tag",
                  tagInput: "react-tag-div",
                  tagInputField: "react-tag-input",
                  selected: "react-tag-selected",
                  suggestions: "react-tag-suggestion",
                  activeSuggestion: "active-suggestion",
                }}
                inline={false}
                placeholder="Enter some tags..."
                tags={tags}
                delimiters={delimiters}
                suggestions={suggestions}
                handleAddition={handleAddition}
                handleDelete={handleDelete}
                handleDrag={handleDrag}
                handleTagClick={handleTagClick}
                autocomplete
              />
            </div>
          </div>
          <div className="top-start-chat" id="preview-img">
            <img className="preview-photo" src={preview} alt="preview" />
            <span id="span-title">
              <div className="badge-group-show title">Title</div>
              <p id="title">{title}</p>
            </span>
            <span id="span-owner">
              <div className="badge-group-show owner">Owner</div>
              <p id="owner">{user.username}</p>
            </span>
            <span id="span-description">
              <div className="badge-group-show description">Description</div>
              <p id="description">{description}</p>
            </span>
          </div>
          <div className="main-start-chat">Start a new chat!</div>
          <div className="bottom-start-chat">
            <input
              type="submit"
              value="Create room"
              className="input-sendmessage"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateChat;
