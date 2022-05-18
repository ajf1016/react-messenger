import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { AuthContext } from "../context/auth";
import { signOut, getAuth } from "firebase/auth";

function Navbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user, "AUTH CURRENTUSER");
  const auth = getAuth();

  const handleSignout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
    navigate("/login");
  };
  return (
    <nav>
      <h3>
        <Link to="/">Messenger</Link>
      </h3>
      <div>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button
              onClick={handleSignout}
              style={{
                backgroundColor: "#2d2d2d",
                color: "#fff",
                width: 100,
                height: 60,
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
