import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/Vector Logo.svg";
import "./HomePage.css";
import AddPeople from "../components/AddPeople.jsx";
import Search from "../components/Search.jsx";
import music from "../assets/music.png";
import video from "../assets/video.png";
import pdf from "../assets/pdf.png";
import image from "../assets/image.png";
import others from "../assets/other.png";
import textIcon from "../assets/text.png";
import close from "../assets/close.png";
import logout from "../assets/logout.1024x922.png";

// Utility Functions
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

// Components
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

const FileItem = ({
  title,
  size,
  altText,
  type,
  dateAndTime,
  objectId,
  userLoggedIn,
  objects,
  onPopoverToggle,
  isToggled,
  closePopover,
}) => {
  const [isOwned, setIsOwned] = useState(false);

  useEffect(() => {
    setIsOwned(
      objects.find((obj) => obj.id === objectId).owner.username === userLoggedIn
    );
  }, [objects, objectId, userLoggedIn]);

  const handleToggle = (event) => {
    event.preventDefault();
    onPopoverToggle(objectId);
  };

  const formattedDate = format(new Date(dateAndTime), "hh:mma, dd MMM");
  const formattedSize = formatBytes(size);
  const imgSrc = getImageSrcByFileType(type);

  return (
    <>
      <div className="file-item" onContextMenu={handleToggle}>
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
            closePopover={closePopover}
            objectId={objectId}
            fileName={title}
            userLoggedIn={userLoggedIn}
            access={isOwned}
          />
        )}
      </div>
    </>
  );
};

const FilePopover = ({
  title,
  access,
  closePopover,
  objectId,
  fileName,
  userLoggedIn,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [downloadLink, setDownloadLink] = useState(null);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDownload = async () => {
    const requestData = { object_id: objectId };

    try {
      const response = await axios.get(
        "http://localhost:8000/objects/download_file",
        { params: requestData }
      );

      const downloadLink = response.data.download_link;
      const fileNamee = "test.png";
      const link = document.createElement("a");
      link.href = downloadLink;
      link.setAttribute("download", fileNamee);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      closePopover();
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download file");
    }
  };

  const handleDelete = async () => {
    const requestData = { object_id: objectId };

    try {
      const response = await axios.post(
        "http://localhost:8000/objects/delete_file",
        requestData
      );
      alert(response.data.message);
      closePopover();
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file");
    }
  };

  const handleGetUsers = async (e) => {
    e.preventDefault();
    const data = { object_id: objectId };

    const response = await fetch("http://localhost:8000/objects/share_file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      setUsers(responseData.combined_users);
      setUsers((prev) => prev.filter((user) => user.username !== userLoggedIn));
      handleOpenModal();
    } else {
      const errorData = await response.json();
      console.error("Error sharing file:", errorData.error);
    }
  };

  return (
    <>
      <AddPeople
        show={showModal}
        onClose={handleCloseModal}
        objectId={objectId}
        users={users}
      />
      <div className="div">
        <div onClick={closePopover}>
          <img src={close} className="close-icon" />
        </div>
        <div className="div-2">{title}</div>
        {access && (
          <div className="div-5" onClick={handleGetUsers}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/926dadbb5b1c4a288e0397f6c28706a6960c00a13627f11245f7c44d6b11b7f0?"
            />
            <div className="div-6">Share</div>
          </div>
        )}
        <div className="div-5" onClick={handleDownload}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/54a084866dca98a8c1c2265b001eadbb6bcea86e97014eeefe0bf1a7cfdba48a?"
          />
          <div className="div-6">Download</div>
        </div>
        {access && (
          <div className="div-3" onClick={handleDelete}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d311441253fbf2162f3422e3b389a624496183f15680abdea9bc28d3ce29cf6?"
            />
            <div className="div-6">Delete</div>
          </div>
        )}
      </div>
    </>
  );
};

function MyComponent({ onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [size, setSize] = useState(0);
  const [type, setType] = useState("");
  const [totalSize, setTotalSize] = useState(0);
  const fileInputRef = useRef(null);
  const [objects, setObjects] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activePopover, setActivePopover] = useState(null);

  const handleLogoutClick = () => {
    onLogout();
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/objects/objects_list",
          { params: { query, page: currentPage, username } }
        );
        setObjects(response.data.list_of_objects);
        setTotalPages(response.data.total_pages);
        setTotalSize(response.data.total_size);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [query, currentPage, username]);

  useEffect(() => {
    const loggedInUserJSON = sessionStorage.getItem("loggedInUser");
    if (loggedInUserJSON) {
      try {
        const loggedInUser = JSON.parse(loggedInUserJSON);
        setUsername(loggedInUser.username);
        setEmail(loggedInUser.email);
      } catch (error) {
        console.error("Error parsing loggedInUserJSON:", error);
      }
    }
  }, []);

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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSubmit = async (file, fileName, size, type) => {
    const data = new FormData();
    data.append("file", file);
    data.append("file_name", fileName);
    data.append("size", size);
    data.append("type", type);
    data.append("username", username);

    try {
      const response = await axios.post(
        "http://localhost:8000/objects/upload_file",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
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

  const handlePopoverToggle = (objectId) => {
    if (activePopover === objectId) {
      setActivePopover(null);
    } else {
      setActivePopover(objectId);
    }
  };

  const closePopover = () => {
    setActivePopover(null);
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
          <Search setQuery={setQuery} setCurrentPage={setCurrentPage} />
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
            <>
              <IconTextButton
                iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/d69d3b342172fb9a9b5e2c6c581363592f20ddbf72e3f4547e22e7db7fb15294?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&"
                text={username}
                altText="Profile icon"
                type="profile"
              />
              <img
                src={logout}
                className="logout-icon"
                onClick={handleLogoutClick}
              />
            </>
          </div>
        </header>
        <main className="content">
          <h2 className="content-title">Objects</h2>
          <p className="total-storage">
            <span className="total-label">Total:</span> {formatBytes(totalSize)}
          </p>
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
                userLoggedIn={username}
                objects={objects}
                onPopoverToggle={handlePopoverToggle}
                isToggled={activePopover === item.id}
                closePopover={closePopover}
              />
            ))}
          </section>
          <div className="pagination">
            <div
              className={`prev-page ${
                currentPage === 1 ? "disabled" : "enabled"
              }`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Prev
            </div>
            <div className="page-number">{currentPage}</div>
            <div
              className={`next-page ${
                currentPage === totalPages ? "disabled" : "enabled"
              }`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </div>
          </div>
        </main>
      </section>
    </>
  );
}

export default MyComponent;
