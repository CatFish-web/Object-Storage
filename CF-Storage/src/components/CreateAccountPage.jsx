import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateAccountPage.css";
import logo from "../assets/Vector Logo (1).svg";

function Card({ icon, title, subtitle, description, imgSrc, imgAlt }) {
  return (
    <section className="card">
      <div className="icon-wrapper">
        <div className="header-icon">
          <img className="header-icon-img" src={icon} />
        </div>
        <h2 className="card-title">{title}</h2>
      </div>
      <h3 className="card-subtitle">{subtitle}</h3>
      <p className="card-description">{description}</p>
      <img loading="lazy" src={imgSrc} alt={imgAlt} className="card-image" />
    </section>
  );
}

function MyComponent() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    const usernameRegex = /^[a-zA-Z]{4,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*]).{6,}$/;

    if (!formData.username.match(usernameRegex)) {
      errors.username =
        "Username must be at least 4 characters long and contain only English letters.";
    }

    if (!formData.email.match(emailRegex)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.password.match(passwordRegex)) {
      errors.password =
        "Password must be at least 6 characters long and include lowercase, uppercase, number, and special characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // Submit form data
      console.log("Form data:", formData);
      // Simulate sending confirmation email
      sendConfirmationEmail(formData.email);

      // Navigate to the verification page
      navigate('verify')
    } else {
      setErrors(validationErrors);
    }
  };

  const sendConfirmationEmail = (email) => {
    console.log(`Sending confirmation email to ${email}`);
    // In a real application, you'd make an API call here
  };

  return (
    <>
      <main className="main-container">
        <div className="left-column">
          <Card
            icon={logo}
            title="Storage"
            subtitle="Manage your files the best way"
            description="Awesome, we've created the perfect place for you to store all your documents."
            imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/5bf6bbc980dd1e43eeee83b432817860bb3212ade29c790acded42d1c4e29300?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&"
            imgAlt="Storage illustration"
          />
        </div>
        <div className="right-column">
          <form className="login-container" onSubmit={handleSubmit}>
            <h2 className="login-title">Create Account</h2>

            <div className="input-wrapper">
              <label htmlFor="username" className="visually-hidden">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="input-field"
                placeholder="Enter your Username"
                aria-label="Enter your Username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="email" className="visually-hidden">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="input-field"
                placeholder="Enter your Email"
                aria-label="Enter your Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="password" className="visually-hidden">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="input-field"
                placeholder="Enter Password"
                aria-label="Enter Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="confirm-password" className="visually-hidden">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="input-field"
                placeholder="Confirm Password"
                aria-label="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword}</p>
              )}
            </div>
            <button type="submit" className="create-account-button">
              Create Account
            </button>
            <p className="signup-prompt">
              Already have an account?{" "}
              <a href="#" className="signup-link">
                Login
              </a>
            </p>
          </form>
        </div>
      </main>
    </>
  );
}

export default MyComponent;
