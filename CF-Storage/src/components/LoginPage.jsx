import * as React from 'react';
import "./LoginPage.css"
import logo from '../assets/Vector Logo (1).svg';

function Card({ icon, title, subtitle, description, imgSrc, imgAlt }) {
  return (
    <section className="card">
      <div className="icon-wrapper">
      <div className="header-icon">
              <img className="header-icon-img" src={icon}/>
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
          <form className="login-container">
            <h2 className="login-title">Login</h2>
            
            <div className="input-wrapper">
            <label htmlFor="usernameOrEmail" className="visually-hidden">Username | Email</label>
              <input
                type="text"
                id="usernameOrEmail"
                className="input-field"
                placeholder="Enter your Username or Email"
                aria-label="Enter your Username or Email"
              />
            </div>
            <div className="input-wrapper">
            <label htmlFor="password" className="visually-hidden">Password</label>
              <input
                type="password"
                id="password"
                className="input-field"
                placeholder="Enter Password"
                aria-label="Enter Password"
              />
            </div>
            <button type="submit" className="login-button">Login</button>
            <p className="signup-prompt">
              Don't have an account? <a href="#" className="signup-link">Create Account</a>
            </p>
          </form>
        </div>
      </main>

    </>
  );
}

export default MyComponent;