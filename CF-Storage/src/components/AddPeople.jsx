import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddPeopleStyle.css"; 

function ProfileCard({ name, email, hasAccess, onChangeAccess }) {
  const [isChecked, setIsChecked] = useState(hasAccess);

  useEffect(() => {
    setIsChecked(hasAccess);
  }, [hasAccess]);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChangeAccess(name, newCheckedState);
  };

  return (
    <section className="profile-card">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d69d3b342172fb9a9b5e2c6c581363592f20ddbf72e3f4547e22e7db7fb15294?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&"
        className="profile-img"
      />
      <div className="profile-info">
        <h2 className="profile-name">{name}</h2>
        <p className="profile-email">{email}</p>
      </div>
    </section>
  );
}

function MyComponent({ show, onClose, objectId, users }) {
  const [accessList, setAccessList] = useState([]);
  const [noAccessList, setNoAccessList] = useState([]);

  if (!show) {
    return null;
  }

  const handleAccessChange = (username, hasAccess) => {
    if (hasAccess) {
      setAccessList((prev) => [...prev, username]);
      setNoAccessList((prev) => prev.filter((user) => user !== username));
    } else {
      setNoAccessList((prev) => [...prev, username]);
      setAccessList((prev) => prev.filter((user) => user !== username));
    }
  };

  const handleSubmit = async () => {
    const usernames_with_access = accessList;
    const usernames_without_access = noAccessList;
    const requestData = {
      object_id: objectId,
      usernames_with_access,
      usernames_without_access,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/objects/update_access",
        requestData
      );
      alert(response.data.message); 
    } catch (error) {
      console.error("Error updating access:", error);
      // alert("Failed to update access");
    }

    onClose();
  };


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="share-container">
          <header className="header">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/91c0f5f67218c4876995dce4a27205fc7b825d73a04039c9959a50440a8f9209?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&"
              className="share-header-icon"
              alt="Add People"
              onClick={onClose}
            />
            <h1 className="share-header-title">Add People</h1>
          </header>
          <section className="search-box">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/13565d4bf00871f805404973a9aa208c2daef3506f4933e7884a98471f86560f?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&"
              className="search-icon"
              alt="Search people icon"
            />
            <p className="search-title">Search people</p>
          </section>
          <section className="people-container">
            {users.map((user) => (
              <ProfileCard
                key={user.username}
                name={user.username}
                email={user.email}
                hasAccess={user.accessed_objects.includes(objectId)}
                onChangeAccess={handleAccessChange}
              />
            ))}
          </section>
          <footer className="footer">
            <button className="footer-button" onClick={handleSubmit}>
              Continue
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default MyComponent;
