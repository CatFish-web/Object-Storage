import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import logo from "../assets/Vector Logo.svg";
import upload from "../assets/Upload.svg";
import "./HomePage.css";
import Popover from "../components/FilePopover.jsx";
import AddPeople from "../components/AddPeople.jsx";
import music from "../assets/music.png";
import video from "../assets/video.png";
import pdf from "../assets/pdf.png";
import image from "../assets/image.png";
import others from "../assets/other.png";
import textIcon from "../assets/text.png";
import close from "../assets/close.png";

const getImageSrcByFileType = (fileType) => {
  switch (fileType) {
    case "mp3":
      return music;
    case "pdf":
      return pdf;
    case "mp4":
    case "mkv":
      return video;
    case "jpeg":
    case "png":
    case "jpg":
      return image;
    case "txt":
      return textIcon;
    default:
      return others;
  }
};
const formatBytes = (bytes) => {
  if (bytes === 0) return "0 B";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, i);
  const formattedSize =
    size >= 1000 ? size.toFixed(0) : size.toFixed(size >= 100 ? 0 : 1);
  return `${formattedSize} ${sizes[i]}`;
};

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

const FileItem = ({ title, size, altText, type, dateAndTime, objectId }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prevState) => !prevState);
  };

  const formattedDate = format(new Date(dateAndTime), "hh:mma, dd MMM");
  const formattedSize = formatBytes(size);

  const imgSrc = getImageSrcByFileType(type);

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
            <div className="file-info">
              {formattedSize} - {formattedDate}
            </div>
          </div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4328f124125025d4f3dd92757ffb88de4849aea5fe67adab458ddb7195caaadc?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&"
          className="file-action-icon"
          alt=""
          onClick={handleToggle}
        />
        {isToggled && (
          <FilePopover
            title={title}
            toggel={handleToggle}
            objectId={objectId}
            fileName={title}
          />
        )}
      </div>
    </>
  );
};

const FilePopover = ({ title, access, toggel, objectId, fileName }) => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDownload = async () => {
    const requestData = {
      object_id: objectId,
      file_name: fileName,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/objects/download_file",
        requestData
      );
      alert(response.data.message); // Show success or failure message
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download file");
    }
  };

  const handleDelete = async () => {
    const requestData = {
      object_id: objectId,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/objects/delete_file",
        requestData
      );
      alert(response.data.message); // Show success or failure message
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file");
    }
  };

  const handleGetUsers = async (e) => {
    e.preventDefault();

    const data = {object_id: objectId}
    console.log(data);
    const response = await fetch('http://localhost:8000/objects/share_file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      setUsers(responseData.combined_users);
      console.log(responseData)
      handleOpenModal();
    } else {
      const errorData = await response.json();
      setError(errorData.error);
    }
  };
  return (
    <>
      <AddPeople show={showModal} onClose={handleCloseModal} objectId={objectId} users={users} />
      <div className="div">
        <div onClick={toggel}>
          <img src={close} className="close-icon" />
        </div>
        <div className="div-2">{title}</div>
        <div className="div-5" onClick={handleGetUsers}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/926dadbb5b1c4a288e0397f6c28706a6960c00a13627f11245f7c44d6b11b7f0?"
          />
          <div className="div-6">Share</div>
        </div>
        <div className="div-5" onClick={handleDownload} download>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/54a084866dca98a8c1c2265b001eadbb6bcea86e97014eeefe0bf1a7cfdba48a?"
          />
          <div className="div-6">Download</div>
        </div>
        <div className="div-3" onClick={handleDelete}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d311441253fbf2162f3422e3b389a624496183f15680abdea9bc28d3ce29cf6?"
          />
          <div className="div-6">Delete</div>
        </div>
      </div>

      {/* <style jsx>{`
      
    `}</style> */}
    </>
  );
};

function MyComponent() {
  const location = useLocation();
  const { username, email } = location.state || { username: "", email: "" };

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [size, setSize] = useState(0);
  const [type, setType] = useState("");

  const fileInputRef = useRef(null);
  const [objects, setObjects] = useState([]);

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

  useEffect(() => {
    fetch("http://localhost:8000/objects/objects_list")
      .then((response) => response.json())
      .then((data) => {
        if (data.list_of_objects) {
          setObjects(data.list_of_objects);
        } else {
          setError(data.message);
        }
      })
      .catch((error) => setError("Failed to fetch objects"));
  }, []);

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
          {/* <AddPeoplePopup /> */}
          <section className="files-section">
            {objects.map((item, index) => (
              <FileItem
                key={index}
                title={item.file_name}
                size={item.size}
                dateAndTime={item.date_and_time}
                type={item.type}
                altText={item.file_name}
                objectId={item.id}
              />
            ))}
          </section>
        </main>
      </section>
    </>
  );
}

export default MyComponent;
