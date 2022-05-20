import React, { useEffect } from "react";
import Moment from "react-moment";

function ChatScreen({ handleSubmit, setText, text, setImg, msgs }) {
  const handleMessages = () => {
    return msgs.map((msg) => (
      <div>
        {msg.media ? (
          <div style={{
            width: 200,
            height: 200,
          }}>
            <img
              style={{
                width: "100%",
                height: "100%",
              }}
              src={msg.media}
            />{" "}
          </div>
        ) : null}
        <h6>{msg.text}</h6>
        <p>
          <Moment fromNow>{msg.createdAt.toDate()}</Moment>
        </p>
      </div>
    ));
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 680,
          width: "100%",
        }}
      >
        {handleMessages()}
        <h1>hello</h1>
      </div>
      <div
        style={{
          borderTop: "1px solid #f7f7f7",
          height: 65,
          position: "fixed",
          bottom: 0,
          right: 0,
          width: "82%",
          height: 100,
          backgroundColor: "#000",
        }}
      >
        <form action="" onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="enter message here"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default ChatScreen;
