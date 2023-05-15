import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const SignUp = () => {
  const { handleGoogle, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/user/signup`
  );
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});

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

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Please enter your name";
    }
    if (!formData.email.trim()) {
      errors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Please enter a valid email";
    }
    if (!formData.password.trim()) {
      errors.password = "Please enter your password";
    } else if (formData.password.trim().length < 8) {
      errors.password = "Please enter at least 8 characters";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      // call API to register user and handle success/failure accordingly
    }
  };

  return (
    <>
      <nav style={{ padding: "2rem" }}>
        <Link to="/">Go Back</Link>
      </nav>
      <header style={{ textAlign: "center" }}>
        <h1>Register to Continue</h1>
      </header>
      <section style={{ display: "flex", justifyContent: "center" }}>
        <form style={{ width: "50%" }} onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} />
            {formErrors.name && <span style={{ color: "red" }}>{formErrors.name}</span>}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} />
            {formErrors.email && <span style={{ color: "red" }}>{formErrors.email}</span>}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" value={formData.password} onChange={handleInputChange} /> {/* ERROR: The input type should be 'password', not just a label */}
            {formErrors.password && <span style={{ color: "red" }}>{formErrors.password}</span>}
          </div>
          <button type="submit" disabled={loading}>{loading ? "Loading..." : "Sign Up"}</button> {/* ERROR: The button was missing. */}
        </form>
      </section>
      <section style={{ display: "flex", justifyContent: "center" }}>
        <div id="signUpDiv" style={{ margin: "2rem" }}></div> {/* ERROR: Incorrect closing tag for the 'div' element */}
      </section>
    </>
  );
};

export default SignUp;
