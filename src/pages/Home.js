import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Users from "../components/Users";
import userImage from "../assets/user.png";
import ChatScreen from "../components/ChatScreen";

function Home() {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const user1 = auth.currentUser.uid;

  useEffect(() => {
    const userRef = collection(db, "users");
    //create query object
    const q = query(userRef, where("uid", "not-in", [auth.currentUser.uid]));
    //execute query
    const unSub = onSnapshot(q, (QuerySnapshot) => {
      let users = [];
      QuerySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unSub();
  }, []);

  //select user for chat
  const selectUser = (user) => {
    setChat(user);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const msgRef = collection(db, "messages", id, "chat");
    const q = query(msgRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      console.log("WORKING");
      let msgs = [];
      console.log(querySnapshot, "XXXXX");
      querySnapshot.forEach((doc) => {
        console.log("QUERY");
        console.log(doc, "DOC");
        msgs.push(doc.data());
        console.log(msgs, "MSG");
      });
      //   console.log(msgs);
      setMsgs(msgs);
    });
  };

  //onsend chat
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text || img) {
      const user2 = chat.uid;
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
      let url;
      if (img) {
        const imgRef = ref(
          storage,
          `images/${new Date().getTime()} - ${img.name}`
        );
        const snap = await uploadBytes(imgRef, img);
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        url = dlUrl;
      }

      await addDoc(collection(db, "messages", id, "chat"), {
        text,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || "",
      });
      setText("");
    } else {
      console.log("Please select message");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height : 'calc(100vh - 100px)'
      }}
    >
      <div  
        style={{
          width: "25%",
          backgroundColor : '#361353'
        }}
      >
        {users.map((user) => (
          <Users key={user.uid} user={user} selectUser={selectUser} chat={chat}/>
        ))}
      </div>
      <div
        style={{
          width: "75%",
          textAlign: "center",
        }}
      >
        {chat ? (
          <div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                textAlign: "left",
                background : '#250e38',
              }}
            >
              <div
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <img
                  src={chat.avatar || userImage}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
              <div>
                <h1
                  style={{
                    color: "#f7f7f7",
                    
                  }}
                >
                  {chat?.name}
                </h1>
                <h5
                  style={{
                    color: "#f7f7f7",
                    marginTop : 10,
                  }}
                >
                  {chat.isOnline ? "Online" : "Offline"}
                </h5>
              </div>
            </div>
            <ChatScreen
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              setImg={setImg}
              msgs={msgs}
            />
          </div>
        ) : (
          <h3
            style={{
              color: "#f7f7f7",
            }}
          >
            Please Select a User to chat
          </h3>
        )}
      </div>
    </div>
  );
}

export default Home;
