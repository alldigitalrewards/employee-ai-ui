import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const SignUp = () => {
  const { handleGoogle, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/user/signup`
  );

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(
        document.getElementById("signUpDiv"),
        {
          theme: "filled_black",
          text: "Continue with Google",
          shape: "pill",
        }
      );
    }
  }, [handleGoogle]);

  return (
    <>
      <nav style={{ padding: "2rem" }}>
        <Link to="/">Go Back</Link>
      </nav>
      <header style={{ textAlign: "center" }}>
        <h1>Register to Continue</h1>
      </header>
      <section style={{ display: "flex", justifyContent: "center" }}>
        <div id="signUpDiv" style={{ margin: "2rem" }}></div>
      </section>
    </>
  );
};

export default SignUp;
