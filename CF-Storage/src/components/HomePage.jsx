import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../assets/Vector Logo.svg";
import upload from "../assets/Upload.svg";
import "./HomePage.css";
import Popover from "../components/FilePopover.jsx";

const IconTextButton = ({ iconSrc, text, altText, type, onClick }) => (
  <div
    className={type === "profile" ? "profile-button" : "icon-text-button"}
    onClick={onClick}
  >
    <img
      loading="lazy"
      src={iconSrc}
      className={type === "profile" ? "profile-icon" : ""}
      alt={altText}
    />
    <div className="icon-text">{text}</div>
  </div>
);

const PersonCard = ({ username, email, access }) => {
  <div>
    <div className="person-description">
      <div className="person-username">{username}</div>
      <div className="person-email">{email}</div>
    </div>
    <div>
      <img src="" alt="" />
    </div>
    <input
      type="checkbox"
      className={access === "accessed" ? "checked" : "unchecked"}
    ></input>
  </div>;
};

const AddPeoplePopup = ({}) => {
  const peopleList = [
    {
      username: "ali",
      email: "ali@gmail.com",
      access: "accessed",
    },
    {
      username: "nanaz",
      email: "naz@gmail.com",
      access: "",
    },
  ];
  return (
    <div className="popup-add-people">
      <div className="popup-header-container">
        <div className="popup-header">
          <div className="back-button"></div>
          <div className="header-title">Add People</div>
        </div>
        <div className="search-people"></div>
      </div>
      <section className="people-list">
        {peopleList.map((person, index) => (
          <>
            <PersonCard
              key={index}
              username={person.username}
              email={person.email}
              access={person.access}
            />
          </>
        ))}
      </section>
      <div className="popup-footer">
        <button className="continue-button">Continue</button>
      </div>
    </div>
  );
};

const FileItem = ({ imgSrc, title, details, altText }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prevState) => !prevState);
  };

  return (
    <>
      <div className="file-item">
        <div className="file-item-content">
          <img
            loading="lazy"
            src={imgSrc}
            className="file-icon"
            alt={altText}
          />
          <div className="file-details">
            <div className="file-title">{title}</div>
            <div className="file-info">{details}</div>
          </div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4328f124125025d4f3dd92757ffb88de4849aea5fe67adab458ddb7195caaadc?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&"
          className="file-action-icon"
          alt=""
          onClick={handleToggle}
        />
        {isToggled && <FilePopover />}
      </div>
    </>
  );
};

const FilePopover = ({}) => (
  <>
    <div className="div">
      <div className="div-2">App School.fig</div>
      <div className="div-5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/926dadbb5b1c4a288e0397f6c28706a6960c00a13627f11245f7c44d6b11b7f0?"
          className="img"
        />
        <div className="div-6">Share</div>
      </div>
      <div className="div-5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/54a084866dca98a8c1c2265b001eadbb6bcea86e97014eeefe0bf1a7cfdba48a?"
          className="img-2"
        />
        <div className="div-6">Download</div>
      </div>
      <div className="div-3">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d311441253fbf2162f3422e3b389a624496183f15680abdea9bc28d3ce29cf6?"
          className="img"
        />
        <div className="div-6">Delete</div>
      </div>
    </div>
    {/* <style jsx>{`
      
    `}</style> */}
  </>
);

function MyComponent() {
  const fileItems = [
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d6c9028bb56acccb02fe52d2294b5f5a1e7f9fd8e84f56a6561bfe371bf15754?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "App School.fig",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "App School",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f7677d9b03f835fcb57c49ed41bf7e95f9ca907c6bda4ebf3a3afd88cb3908ae?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "BC company.sketch",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "BC company",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/70257065c850f2b4140b4b58f017d85802b51a055842a494959bdb1e636c7908?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "B.UI.xd",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "B.UI",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/676ec6daaa9b5c76b4889d25a83aae63d3138e416089087a041704b038d994b3?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "B.UI.xd",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "B.UI",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d6c9028bb56acccb02fe52d2294b5f5a1e7f9fd8e84f56a6561bfe371bf15754?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "CompanyANV.fig",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "CompanyANV",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f7677d9b03f835fcb57c49ed41bf7e95f9ca907c6bda4ebf3a3afd88cb3908ae?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "company ABC.sketch",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "company ABC",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d6c9028bb56acccb02fe52d2294b5f5a1e7f9fd8e84f56a6561bfe371bf15754?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "My Jobs.fig",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "My Jobs",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d6c9028bb56acccb02fe52d2294b5f5a1e7f9fd8e84f56a6561bfe371bf15754?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "My Jobs.fig",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "My Jobs",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/70257065c850f2b4140b4b58f017d85802b51a055842a494959bdb1e636c7908?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "Photoshop.xd",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "Photoshop",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d6c9028bb56acccb02fe52d2294b5f5a1e7f9fd8e84f56a6561bfe371bf15754?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "P.N design123.fig",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "P.N design123",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f7677d9b03f835fcb57c49ed41bf7e95f9ca907c6bda4ebf3a3afd88cb3908ae?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "system.sketch",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "system",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f7677d9b03f835fcb57c49ed41bf7e95f9ca907c6bda4ebf3a3afd88cb3908ae?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "system.sketch",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "system",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/df158a37d50203cd3cc0abee5870b2b73a151793a1a4b22d691b7ad3480d5501?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "school.pdf",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "school",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/76f6dcfc67f2ff163fe79a7d50505515a7efbe99bcf6f68adb333e7489786f38?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "Una App.fig",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "Una App",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/76f6dcfc67f2ff163fe79a7d50505515a7efbe99bcf6f68adb333e7489786f38?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "Water design999.fig",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "Water design999",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/76f6dcfc67f2ff163fe79a7d50505515a7efbe99bcf6f68adb333e7489786f38?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "Water design.fig",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "Water design",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/76f6dcfc67f2ff163fe79a7d50505515a7efbe99bcf6f68adb333e7489786f38?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "Water design.fig",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "Water design",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a1b7f7ffbe996af58a07241d13d70f0eb6f8b61fa48701db906bc4349a439c56?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "Zuha App.xd",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "Zuha App",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2431f48eb20067337333871d6b36cfdd997ab34c96add7db4a28dd9d3fad13e1?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "zApp.sketch",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "zApp",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2431f48eb20067337333871d6b36cfdd997ab34c96add7db4a28dd9d3fad13e1?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "zApp.sketch",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "zApp",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/76f6dcfc67f2ff163fe79a7d50505515a7efbe99bcf6f68adb333e7489786f38?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "zzz App.fig",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "zzz App",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2431f48eb20067337333871d6b36cfdd997ab34c96add7db4a28dd9d3fad13e1?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "zdesign.sketch",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "zdesign",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/76f6dcfc67f2ff163fe79a7d50505515a7efbe99bcf6f68adb333e7489786f38?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "Yu App.fig",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "Yu App",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/76f6dcfc67f2ff163fe79a7d50505515a7efbe99bcf6f68adb333e7489786f38?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&",
      title: "Yu App.fig",
      details: "10 GB - 10:09pm, 10 Oct",
      altText: "Yu App",
    },
  ];

  const location = useLocation();
  const { username, email } = location.state || { username: "", email: "" };

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [size, setSize] = useState(0);
  const [type, setType] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setSize(selectedFile.size);
      setType(selectedFile.type);
      handleSubmit(
        selectedFile,
        selectedFile.name,
        selectedFile.size,
        selectedFile.type
      );
    }
  };

  const handleSubmit = async (file, fileName, size, type) => {
    const data = new FormData();
    data.append("file", file);
    data.append("file_name", fileName);
    data.append("size", size);
    data.append("type", type);

    console.log({ file, file_name: fileName, size, type });

    try {
      const response = await axios.post(
        "http://localhost:8000/objects/upload_file",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file metadata:", error);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  //   const [file, setFile] = useState(null);
  //   const [fileName, setFileName] = useState("");
  //   const [size, setSize] = useState(0);
  //   const [type, setType] = useState("");

  //   // const fileInputRef = useRef(null);

  //   const handleFileChange = async (e) => {
  //     const selectedFile = e.target.files[0];

  //     if (selectedFile) {
  //       setFile(selectedFile);
  //       setFileName(selectedFile.name);
  //       setSize(selectedFile.size);
  //       setType(selectedFile.name.split(".").pop()); // Get file extension as type

  //       // Automatically submit the form after file selection
  //       // await handleSubmit();
  //     }
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     if (!file) {
  //       console.error("No file selected");
  //       return;
  //     }

  //     const data = new FormData();
  //     data.append("file", file);
  //     data.append("file_name", fileName);
  //     data.append("size", size);
  //     data.append("type", type)

  //     console.log({ file, file_name: fileName, size, type });

  //   // useEffect(() => {
  //   //   if(file){
  //   //     const data = {
  //   //       file: file,
  //   //       file_name: fileName,
  //   //       size: size,
  //   //       type: type,
  //   //   };
  //   try {
  //     const response = await axios.post('http://localhost:8000/objects/upload_file', data, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error uploading file metadata:", error);
  //   }
  // };

  //   //     const uploadFile = async () => {
  //   //       try {
  //   //         const response = await axios.post('http://localhost:8000/objects/upload_file', data);
  //   //         console.log(response.data);
  //   //       } catch (error) {
  //   //         console.error("Error uploading file metadata:", error);
  //   //       }
  //   //     };

  //   //     uploadFile();
  //   //   }

  //   // }, [file, fileName, size, type]);

  //   // const handleButtonClick = () => {
  //   //   fileInputRef.current.click();
  //   // };

  //   // const handleSubmit = async () => {
  //   //   const data = {
  //   //     file: file,
  //   //     file_name: fileName,
  //   //     size: size,
  //   //     type: type,
  //   //   };
  //   //   console.log(data);

  //   //   try {
  //   //     const response = await axios.post('http://localhost:8000/objects/upload_file', data);

  //   //     // const response = await axios.post(
  //   //     //   "http://localhost:8000/objects/upload_file",
  //   //     //   data,
  //   //     //   {
  //   //     //     headers: {
  //   //     //       "Content-Type": "application/json",
  //   //     //     },
  //   //     //   }
  //   //     // );
  //   //     console.log(response.data);
  //   //   } catch (error) {
  //   //     console.error("Error uploading file metadata:", error);
  //   //   }
  //   // };

  return (
    <>
      <section className="main-section">
        <header className="main-header">
          <div className="header-left">
            <div className="header-icon">
              <img className="header-icon-img" src={logo} />
            </div>
            <h1 className="header-title">Storage</h1>
          </div>
          <div className="search-bar">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5308af8b2c2ceea3186be55a4c443dc4042525f0d6a68f51cbfc153ac84cb32a?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&"
              className="search-icon"
              alt="Search icon"
            />
            <span className="search-text">Search ...</span>
          </div>
          <div className="header-right">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              required
            />
            <IconTextButton
              iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/aaf32a8941934dbd526e261b3bc93f8e8f6bb021c640a9266a5dbf94f84d2311?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&"
              text="Upload"
              altText="Upload icon"
              type=""
              onClick={handleButtonClick}
            />

            <IconTextButton
              iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/d69d3b342172fb9a9b5e2c6c581363592f20ddbf72e3f4547e22e7db7fb15294?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&"
              text={username}
              altText="Profile icon"
              type="profile"
            />
          </div>
        </header>
        <main className="content">
          <h2 className="content-title">Objects</h2>
          <p className="total-storage">
            <span className="total-label">Total:</span> 12GB
          </p>
          <AddPeoplePopup />
          <section className="files-section">
            {fileItems.map((item, index) => (
              <>
                <FileItem
                  key={index}
                  imgSrc={item.imgSrc}
                  title={item.title}
                  details={item.details}
                  altText={item.altText}
                />
              </>
            ))}
          </section>
        </main>
      </section>
    </>
  );
}

export default MyComponent;
