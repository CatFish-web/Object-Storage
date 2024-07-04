import * as React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./VerifyPage.css";
import "./UserInteraction.css";
import logo from "../assets/Vector Logo (1).svg";
import sendMailImage from "../assets/Illustration.svg";

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
  const location = useLocation();
  const { emailAddress } = location.state || {};
  const navigate = useNavigate();

  console.log(emailAddress);
  const handleNavigateLogin = () => {
    navigate("/login");
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
          <div className="verify-email-container">
            <h2 className="check-email-title">Check your email</h2>
            <img src={sendMailImage} />
            <p className="check-email-subtitle">
              We've sent an email to{" "}
              <span className="email-address-text">{emailAddress}</span> to
              verify your account.
            </p>
            <button
              type="submit"
              className="login-button"
              onClick={handleNavigateLogin}
            >
              Login
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default MyComponent;
