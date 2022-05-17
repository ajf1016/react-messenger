import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";

function Register() {
  let navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  const { name, email, password, error, loading } = data;

  //input onchange
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  //when click on submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("STARTTED");
    console.log(data, "ONSUBMIT");
    setData({ ...data, error: null, loading: true });
    if (!name || !email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      //create user
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //store data in firebase
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      console.log(doc);

      //clear state
      setData({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      console.log(result.user, "RESULT USER");
	  navigate('/')
    } catch (err) {
      console.log(err);
      setData({ ...data, error: err.message });
    }
    console.log("ENDED");
  };

  return (
    <div id="register">
      <h1>Create User</h1>
      <form action="" className="form" onSubmit={handleSubmit}>
        <input type="text" name="name" value={name} onChange={handleChange} />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        {error && (
          <p
            style={{
              color: "#f7f7f7",
              textAlign: "center",
              fontSize: 18,
              marginTop: -20,
              marginBottom: 20,
            }}
          >
            {error}
          </p>
        )}
        <button className="btn" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
