import * as React from "react";

const styles = `
  .container {
    border-radius: 30px;
    background-color: #fff;
    display: flex;
    max-width: 551px;
    padding-top: 22px;
    flex-direction: column;
    width: 500px;
  }

  .content {
    z-index: 10;
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 0 30px;
  }

  @media (max-width: 991px) {
    .content {
      max-width: 100%;
      padding: 0 20px;
    }
  }

  .header {
    display: flex;
    gap: 20px;
    font-size: 20px;
    color: #333f4e;
    font-weight: 600;
    text-align: center;
    line-height: 130%;
  }

  @media (max-width: 991px) {
    .header {
      max-width: 100%;
      flex-wrap: wrap;
    }
  }

  .header-icon {
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 48px;
  }

  .header-text {
    font-feature-settings: "clig" off, "liga" off;
    font-family: Poppins, sans-serif;
    flex-grow: 1;
    flex-basis: auto;
    margin: auto 0;
  }

  .search-bar {
    align-items: start;
    border-radius: 30px;
    box-shadow: 0 30px 40px 0 rgba(89, 104, 178, 0.06), 0 0 30px 0 rgba(89, 104, 178, 0.06);
    background-color: #fff;
    display: flex;
    margin-top: 22px;
    flex-direction: column;
    font-size: 14px;
    color: #a3b2c7;
    font-weight: 400;
    line-height: 143%;
    justify-content: center;
    padding: 16px;
  }

  @media (max-width: 991px) {
    .search-bar {
      max-width: 100%;
      padding-right: 20px;
    }
  }

  .search-input {
    display: flex;
    gap: 7px;
  }

  .search-icon {
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 20px;
  }

  .search-placeholder {
    font-feature-settings: "clig" off, "liga" off;
    font-family: Poppins, sans-serif;
  }

  .continue-button {
    justify-content: center;
    border-radius: 0 0 30px 30px;
    box-shadow: 4px 4px 20px 0 rgba(32, 73, 109, 0.1);
    background-color: #fff;
    display: flex;
    margin-top: -9px;
    width: 100%;
    gap: 20px;
    font-size: 15px;
    color: #fff;
    font-weight: 600;
    white-space: nowrap;
    text-align: center;
    line-height: 133%;
    padding: 19px 30px 30px;
  }

  @media (max-width: 991px) {
    .continue-button {
      max-width: 100%;
      flex-wrap: wrap;
      white-space: initial;
      padding: 0 20px;
    }
  }

  .continue-icon {
    aspect-ratio: 2.5;
    object-fit: auto;
    object-position: center;
    width: 100px;
    align-self: start;
    max-width: 100%;
  }

  .continue-text {
    font-feature-settings: "clig" off, "liga" off;
    font-family: Poppins, sans-serif;
    justify-content: center;
    border-radius: 41px;
    box-shadow: 0 8px 30px 0 rgba(65, 89, 214, 0.3);
    background-color: #7288fa;
    padding: 10px 18px;
  }

  @media (max-width: 991px) {
    .continue-text {
      white-space: initial;
      padding: 0 20px;
    }
  }
`;

// interface PersonProps {
//   name: string;
//   email: string;
//   avatarSrc: string;
//   isSelected?: boolean;
// }

const Person = ({ name, email, avatarSrc, isSelected }) => (
  <div className="person">
    {isSelected !== undefined && (
      <div className="checkbox-wrapper">
        <input type="checkbox" checked={isSelected} className="visually-hidden" />
        <span className="checkbox" aria-hidden="true"></span>
      </div>
    )}
    <img src={avatarSrc} alt={`Avatar of ${name}`} className="avatar" />
    <div className="person-info">
      <div className="person-name">{name}</div>
      <div className="person-email">{email}</div>
    </div>
    <style jsx>{`
     
    `}</style>
  </div>
);

const peopleData = [
  { name: "Alice Emma", email: "emmaart1234@gmail.com", avatarSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/574b26032daaf24614013a745fec66cc514d1d0448555cf2bb5fe0a4586ea9cb?apiKey=aba627df6e024cbf9e0fd08efec9a051&" },
  { name: "Anne Jennifer", email: "jennifer@gmail.com", avatarSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7d7a1aafdb8ca2d0e64d18e8fd99b957cd4544068a57bffd47555c57cc6928bf?apiKey=aba627df6e024cbf9e0fd08efec9a051&" },
  { name: "Bush Matthew", email: "matthew0909@gmail.com", avatarSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/2d6d35349ead3f5e0454aa3717bae76fa052fa6f6cdfa8f0fe90f8e20c6de32d?apiKey=aba627df6e024cbf9e0fd08efec9a051&" },
  { name: "Henry Rebecca", email: "henryrebeccca1234@gmail.com", avatarSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/491db15174abac91c7bec7a216bb8352d1a925feeae1317df6afb7194149f0ea?apiKey=aba627df6e024cbf9e0fd08efec9a051&" },
  { name: "Geogre Michael", email: "art1234@gmail.com", avatarSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/2046070f6446781799448bb1ac9ea67ef8fd977727fcc70e0729c22bb990f725?apiKey=aba627df6e024cbf9e0fd08efec9a051&" },
  { name: "Robert Laura", email: "lauralauralaura@gmail.com", avatarSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/0f2f30fe22af6f333de9e526a65f4b1950c7ab919ad05764e86984359640c479?apiKey=aba627df6e024cbf9e0fd08efec9a051&", isSelected: true },
  { name: "Sarah Elizabeth", email: "sarahh@gmail.com", avatarSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/afe07cf1a951af5ddf4cc09dbeaf7716b19008a1cb7267b2aa0c7baeea0de413?apiKey=aba627df6e024cbf9e0fd08efec9a051&", isSelected: true },
  { name: "Alice Emma", email: "emmaart1234@gmail.com", avatarSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/574b26032daaf24614013a745fec66cc514d1d0448555cf2bb5fe0a4586ea9cb?apiKey=aba627df6e024cbf9e0fd08efec9a051&", isSelected: true },
];

const AddPeople = () => {
  return (
    <main className="container">
      <section className="content">
        <header className="header">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4c1bda33ff22f674738f2f629e8170ff29d62487a6d7e1b4023503c426a67feb?apiKey=aba627df6e024cbf9e0fd08efec9a051&" alt="" className="header-icon" />
          <h1 className="header-text">Add People</h1>
        </header>
        <form className="search-bar">
          <div className="search-input">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/d65b519413a46b7222895a4a9e48003b1593a39206bea1b03bda06dbbff38dcb?apiKey=aba627df6e024cbf9e0fd08efec9a051&" alt="" className="search-icon" />
            <label htmlFor="search-people" className="visually-hidden">Search people</label>
            <input type="text" id="search-people" placeholder="Search people" className="search-placeholder" />
          </div>
        </form>
        {peopleData.map((person, index) => (
          <Person key={index} {...person} />
        ))}
      </section>
      <footer className="continue-button">
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/d479be43f0cb0acc0f43b5e6715caf063a647f02465bf5efd20ffa8a6604a75b?apiKey=aba627df6e024cbf9e0fd08efec9a051&" alt="" className="continue-icon" />
        <button className="continue-text">Continue</button>
      </footer>
      <style jsx>{styles}</style>
    </main>
  );
};

export default AddPeople;