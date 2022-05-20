import React from "react";
import userImage from "../assets/user.png";

function Users({ user, selectUser }) {
  return (
    <div
      onClick={() => selectUser(user)}
      style={{
        display: "flex",
        position: "relative",
        flexDirection: "row",
        marginBottom: 20,
        paddingBottom: 20,
        borderBottom: "1px solid #f7f7f7",
        position : 'fixed',
        width : '18%',
        height : '87vh',
        top : 100,
        backgroundColor : '#000',
        left : 0,
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          border: "1px solid #f7f7f7",
          borderRadius: "50%",
          overflow: "hidden",
          marginRight: 20,
        }}
      >
        <img
          src={user.avatar || userImage}
          alt="profile"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            backgroundColor: user.isOnline ? "green" : "red",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 10,
          }}
        ></div>
      </div>
      <div>
        <h1
          style={{
            color: "#fff",
            fontSize: 20,
          }}
        >
          {user.name}
        </h1>
      </div>
    </div>
  );
}

export default Users;
