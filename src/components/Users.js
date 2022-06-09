import React from "react";
import userImage from "../assets/user.png";

function Users({ user, selectUser,chat }) {
  return (
    <div className="user-List"
      onClick={() => selectUser(user)}
      style={{
        display: "flex",
        position: "relative",
        flexDirection: "row",
        marginBottom: 20,
        paddingBottom: 20,
        padding : 10,
        backgroundColor : chat.uid === user.uid ? '#250e38' : '#55396b',
        borderRadius : 5,
        cursor : 'pointer ',
        
      }}
    >
      <div
        style={{
          width: 50,
          height: 50,
          border: "2px solid #fff",
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
            width: 15,
            height: 15,
            borderRadius: "50%",
            backgroundColor: user.isOnline ? "#5FD068" : "#FF5B00",
            position: "absolute",
            top: 8,
            left: 10,
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
