import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { updateDoc, doc, Timestamp } from "firebase/firestore";

function Login() {
  let navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  const { email, password, error, loading } = data;

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
    if (!email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      //login user
      const result = await signInWithEmailAndPassword(auth, email, password);

      //update data in firebase
      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });
      console.log(doc);

      //clear state
      setData({
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      console.log(result.user, "RESULT USER");
      navigate("/");
    } catch (err) {
      console.log(err);
      setData({ ...data, error: err.message });
    }
    console.log("ENDED");
  };

  return (
    <div id="register">
      <h1>Login User</h1>
      <form
        action=""
        className="form"
        onSubmit={handleSubmit}
        style={{
          height: 280,
        }}
      >
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
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
