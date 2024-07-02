import React, { useState, useEffect } from 'react';
import "./AddPeopleStyle.css"

function ProfileCard({ name, email, imgSrc, altText, iconAltText, hasAccess }) {
    // Set the initial state of the checkbox based on the prop
    const [isChecked, setIsChecked] = useState(hasAccess);

    // Sync state with prop if it changes
    useEffect(() => {
      setIsChecked(hasAccess);
    }, [hasAccess]);
  
    // Handle change event to toggle checkbox state
    const handleCheckboxChange = () => {
      setIsChecked(prevChecked => !prevChecked);
    };
  
  return (
    <>
      <section className="profile-card">
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/> 
        {/* <img src={iconSrc} className="profile-icon" alt={iconAltText} /> */}
        <img src={imgSrc} className="profile-img" alt={altText} />
        <div className="profile-info">
          <h2 className="profile-name">{name}</h2>
          <p className="profile-email">{email}</p>
        </div>
      </section>
    </>
  );
}

function MyComponent({show, onClose}) {
  const profiles = [
    {
      name: "Alice Emma",
      email: "emmaart1234@gmail.com",
      imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/64704d70ae65fb23ca56a665889a561794a384add85b66caa6931140b9db8caa?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/2828770ad3ff4f590f6f3c0d332f51925e4ca932d22913ce017fdd9e82de7a1c?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      altText: "Profile image of Alice Emma",
      iconAltText: "Icon",
      access: true,
    },
    {
      name: "Anne Jennifer",
      email: "jennifer@gmail.com",
      imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/71eef51afc0df1a62e6acbcbafeef4dc531a00b6981379f2a24fb1aa8b6e3beb?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/2828770ad3ff4f590f6f3c0d332f51925e4ca932d22913ce017fdd9e82de7a1c?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      altText: "Profile image of Anne Jennifer",
      iconAltText: "Icon",
      access: false,
    },
    {
      name: "Anne Jennifer",
      email: "jennifer@gmail.com",
      imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/71eef51afc0df1a62e6acbcbafeef4dc531a00b6981379f2a24fb1aa8b6e3beb?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/2828770ad3ff4f590f6f3c0d332f51925e4ca932d22913ce017fdd9e82de7a1c?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      altText: "Profile image of Anne Jennifer",
      iconAltText: "Icon",
      access: false,
    },
    {
      name: "Anne Jennifer",
      email: "jennifer@gmail.com",
      imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/71eef51afc0df1a62e6acbcbafeef4dc531a00b6981379f2a24fb1aa8b6e3beb?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/2828770ad3ff4f590f6f3c0d332f51925e4ca932d22913ce017fdd9e82de7a1c?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      altText: "Profile image of Anne Jennifer",
      iconAltText: "Icon",
      access: false,
    },
    {
      name: "Bush Matthew",
      email: "matthew0909@gmail.com",
      imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/57e9ada247f491f284ec4058defdff0c2e5576494b17879a367344c54bcfda80?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/2828770ad3ff4f590f6f3c0d332f51925e4ca932d22913ce017fdd9e82de7a1c?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      altText: "Profile image of Bush Matthew",
      iconAltText: "Icon",
      access: true,
    },
    {
      name: "Henry Rebecca",
      email: "henryrebeccca1234@gmail.com",
      imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/dc530973f138cccfa89a72092c322dc4d05e53c43377b00ab42fc523f1a3933c?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/2828770ad3ff4f590f6f3c0d332f51925e4ca932d22913ce017fdd9e82de7a1c?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      altText: "Profile image of Henry Rebecca",
      iconAltText: "Icon",
      access: true,
    },
    {
      name: "George Michael",
      email: "art1234@gmail.com",
      imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/37678b57608d902eff4c673a32622ba19c6fbb3c147ee2976359a37d69a38ebf?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/2828770ad3ff4f590f6f3c0d332f51925e4ca932d22913ce017fdd9e82de7a1c?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      altText: "Profile image of George Michael",
      iconAltText: "Icon",
      access: false,
    },
    {
      name: "Robert Laura",
      email: "lauralauralaura@gmail.com",
      imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/41a3b20fdcc8d8e3c081ac786dc890cf945a4fab9e6753b45ecb65f5de41b847?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/2828770ad3ff4f590f6f3c0d332f51925e4ca932d22913ce017fdd9e82de7a1c?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      altText: "Profile image of Robert Laura",
      iconAltText: "Icon",
      access: true,
    },
    {
      name: "Sarah Elizabeth",
      email: "sarahh@gmail.com",
      imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/5772363aa3aedc662e750f456ea43fa7dc1790dd2a56bdda4f89210a973e4c40?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/2828770ad3ff4f590f6f3c0d332f51925e4ca932d22913ce017fdd9e82de7a1c?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      altText: "Profile image of Sarah Elizabeth",
      iconAltText: "Icon",
      access: false,
    },
  ];

  // if (!show) {
  //   return null;
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the logic to handle adding people here
    console.log("bye bye");
    onClose();
  };
  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
      <div className="share-container">
        <header className="header">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/91c0f5f67218c4876995dce4a27205fc7b825d73a04039c9959a50440a8f9209?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&" className="share-header-icon" alt="Add People" onClick={onClose} />
          <h1 className="share-header-title">Add People</h1>
        </header>
        <section className="search-box">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/13565d4bf00871f805404973a9aa208c2daef3506f4933e7884a98471f86560f?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&" className="search-icon" alt="Search people icon" />
          <p className="search-title">Search people</p>
        </section>
        <section className="people-container">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.email}
            name={profile.name}
            email={profile.email}
            imgSrc={profile.imgSrc}
            iconSrc={profile.iconSrc}
            altText={profile.altText}
            iconAltText={profile.iconAltText}
            hasAccess={profile.access}
          />
        ))}
        </section>
        <footer className="footer">
          <button className="footer-button" onClick={handleSubmit}>Continue</button>
        </footer>
      </div>
      </div>
    </div>
  );
}

export default MyComponent;