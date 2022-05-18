import React, { useEffect, useState } from "react";
import { storage, db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";

function Profile() {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    //take profile details
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });

    //upload image
    if (img) {
      const uploadImage = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        try {

          //delete overriding image
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          //update image
          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
          setImg("");
        } catch (err) {
          console.log(err);
        }
      };
      uploadImage();
    }
  }, [img]);

  //delete image completely
  const deleteImg = async () => {
    try {
      const confirm = window.confirm("Delete..?");
      if (confirm) {
        await deleteObject(ref(storage, user.avatarPath));
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          avatarPath: "",
          avatar: "",
        });
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="register">
      <div
        className="user-image"
        style={{
          marginTop: 50,
        }}
      >
        {user?.avatar && (
          <img
            src={user?.avatar}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        placeholder="upload image"
        style={{
          width: 190,
          height: 20,
        }}
        onChange={(e) => setImg(e.target.files[0])}
      />
      {user?.avatar && (
        <button
          onClick={deleteImg}
          style={{
            backgroundColor: "#f7f7f7",
            color: "#000",
            fontSize: 20,
          }}
        >
          deleteImage
        </button>
      )}
      <h2 color="#fff">
        name{" : "}
        {user?.name}
      </h2>
      <h2 color="#fff">
        email{" : "}
        {user?.email}
      </h2>
      <h2 color="#fff">
        Joined at{" : "}
        {user?.createdAt.toDate().toDateString()}
      </h2>
    </div>
  );
}

export default Profile;
