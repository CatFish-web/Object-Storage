import * as React from "react";

function ProfileCard({ name, email, imgSrc, iconSrc, altText, iconAltText, access }) {
  return (
    <>
      <section className="profile-card">
        {access ? <input type="checkbox" className="access-checkbox" /> : <div className="empty-box" />}
        <img src={iconSrc} className="profile-icon" alt={iconAltText} />
        <img src={imgSrc} className="profile-img" alt={altText} />
        <div className="profile-info">
          <h2 className="profile-name">{name}</h2>
          <p className="profile-email">{email}</p>
        </div>
      </section>
    </>
  );
}

function MyComponent() {
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

  return (
    <>
      <aside className="container">
        <header className="header">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/91c0f5f67218c4876995dce4a27205fc7b825d73a04039c9959a50440a8f9209?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&" className="header-icon" alt="Add People" />
          <h1 className="header-title">Add People</h1>
        </header>
        <section className="search-box">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/13565d4bf00871f805404973a9aa208c2daef3506f4933e7884a98471f86560f?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&" className="search-icon" alt="Search people icon" />
          <p className="search-title">Search people</p>
        </section>
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.email}
            name={profile.name}
            email={profile.email}
            imgSrc={profile.imgSrc}
            iconSrc={profile.iconSrc}
            altText={profile.altText}
            iconAltText={profile.iconAltText}
            access={profile.access}
          />
        ))}
        <footer className="footer">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/65d8917b44ef14dbb95151d9bb4b23568a43585463649ab6fb6cb85b8fe1b277?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&" className="footer-img" alt="Continue icon" />
          <button className="footer-button">Continue</button>
        </footer>
      </aside>
      <style jsx>{`
        .container {
          border-radius: 30px;
          background-color: #fff;
          display: flex;
          max-width: 551px;
          padding: 22px 0;
          flex-direction: column;
        }
        .header {
          display: flex;
          align-items: center;
          width: 100%;
          flex-direction: column;
          padding: 0 30px;
        }
        @media (max-width: 991px) {
          .header {
            max-width: 100%;
            padding: 0 20px;
          }
        }
        .header-icon {
          width: 48px;
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
        }
        .header-title {
          font-family: Poppins, sans-serif;
          font-size: 20px;
          color: var(--Text-Light-01, #333f4e);
          font-weight: 600;
          text-align: center;
          line-height: 130%;
          flex-grow: 1;
          margin: auto 0;
        }
        .search-box {
          display: flex;
          align-items: center;
          border-radius: 30px;
          box-shadow: 0 30px 40px rgba(89, 104, 178, 0.06), 0 0 30px rgba(89, 104, 178, 0.06);
          background-color: var(--Default-White, #fff);
          margin-top: 22px;
          padding: 16px;
          font-size: 14px;
          color: var(--Text-Light-02, #a3b2c7);
          font-weight: 400;
          line-height: 143%;
        }
        .search-icon {
          width: 20px;
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          margin-right: 7px;
        }
        .search-title {
          font-family: Poppins, sans-serif;
        }
        .profile-card {
          display: flex;
          align-items: center;
          background-color: var(--Default-White, #fff);
          margin-top: 24px;
          padding-right: 80px;
          padding-left: 12px;
          gap: 12px;
          font-size: 14px;
          line-height: 143%;
        }
        .access-checkbox {
          margin-right: 12px;
        }
        .empty-box {
          width: 18px;
          margin-right: 12px;
        }
        @media (max-width: 991px) {
          .profile-card {
            flex-wrap: wrap;
            padding-right: 20px;
          }
        }
        .profile-icon {
          width: 18px;
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          margin: auto 0;
        }
        .profile-img {
          width: 44px;
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          box-shadow: 0 8.8px 22px rgba(66, 71, 97, 0.2);
        }
        .profile-info {
          display: flex;
          flex-direction: column;
        }
        .profile-name {
          font-family: Poppins, sans-serif;
          font-size: 14px;
          color: var(--Text-Light-01, #333f4e);
          font-weight: 600;
        }
        .profile-email {
          color: var(--Text-Light-02, #a3b2c7);
          font-family: Poppins, sans-serif;
          font-weight: 400;
          margin-top: 4px;
        }
        .footer {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0 0 30px 30px;
          box-shadow: 4px 4px 20px rgba(32, 73, 109, 0.1);
          background-color: #fff;
          margin-top: -9px;
          padding: 19px 30px;
          font-size: 15px;
          color: var(--Default-White, #fff);
          font-weight: 600;
          text-align: center;
          line-height: 133%;
        }
        @media (max-width: 991px) {
          .footer {
            flex-wrap: wrap;
            padding: 0 20px;
          }
        }
        .footer-img {
          width: 100px;
          aspect-ratio: 2.5;
          object-fit: auto;
          object-position: center;
          max-width: 100%;
          margin-right: 20px;
        }
        .footer-button {
          font-family: Poppins, sans-serif;
          border-radius: 41px;
          box-shadow: 0 8px 30px rgba(65, 89, 214, 0.3);
          background-color: var(--Default-Brand, #7288fa);
          padding: 10px 18px;
          color: white;
        }
      `}</style>
    </>
  );
}

export default MyComponent;