import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  const { name, email, password, error, loading } = data;
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!name || !email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      setData({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      console.log(result.user);
    } catch (err) {
      console.log(err);
      setData({ ...data, error: err.message });
    }
    console.log(data, "ONSUBMIT");
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
        <button className="btn">Register</button>
      </form>
    </div>
  );
}

export default Register;
