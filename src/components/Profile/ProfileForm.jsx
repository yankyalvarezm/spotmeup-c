import React, { useState, useContext, useEffect, useRef } from "react";
import { useAsyncError, useNavigate } from "react-router-dom";
import SpotMeUpIcon from "../ToolsC/SpotMeUpIcon";
import { editUser } from "../../services/user.service";
import { AuthContext } from "../../context/auth.context";
import { GoogleMapsContext } from "../../context/GoogleMapsContext";

const ProfileForm = () => {
  const { user, setUser } = useContext(AuthContext);
  const { isApiLoaded } = useContext(GoogleMapsContext);
  const [successMessage, setSuccessMessage] = useState(null);
  const [notSuccessMessage, setNotSuccessMessage] = useState(null);
  const navigate = useNavigate();
  const autocompleteInputRef = useRef(null);

  useEffect(() => {
    console.log("API Loaded:", isApiLoaded);
    if (isApiLoaded && autocompleteInputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteInputRef.current,
        {
          componentRestrictions: { country: ["DO"] },
          fields: [
            "place_id",
            "geometry",
            "name",
            "formatted_address",
            "address_components",
          ],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log("formatted address:", place);
        if (place.formatted_address) {
          setFormState((prevState) => ({
            ...prevState,
            address: place.name,
          }));
        }
      });
    }
  }, [isApiLoaded]);

  const [formState, setFormState] = useState({
    name: user?.name || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    telephone: user?.telephone || "",
    address: user?.address || "",
    nationalID: user?.nationalID || "",
    userProfileImage: user?.userProfileImage || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "telephone") {
      const formattedValue = formatPhoneNumber(value);
      setFormState((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    setFormState({
      name: user?.name || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      telephone: user?.telephone || "",
      address: user?.address || "",
      nationalID: user?.nationalID || "",
      userProfileImage: user?.userProfileImage || "",
    });

    // console.log("Form State:", formState);
  }, [user]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    console.log("FormState - Line 52:", formState);

    try {
      const response = await editUser(formState, setUser);
      console.log("Line 24 - Response:", response);

      setSuccessMessage(response.message);

      setTimeout(() => {
        setSuccessMessage(null);
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Line 26 - Error:", error);
      if (error.response.data.message) {
        setNotSuccessMessage(error.response.data.message);
      }

      setTimeout(() => {
        setNotSuccessMessage(null);
      }, 3000);
    }
  };

  const formatPhoneNumber = (value) => {
    let numbers = value.replace("+1", "").replace(/[^\d]/g, "");
    if (numbers.length > 10) {
      numbers = numbers.substring(0, 10);
    }

    let formattedNumber = numbers;
    if (numbers.length > 6) {
      formattedNumber = `+1(${numbers.slice(0, 3)})-${numbers.slice(
        3,
        6
      )}-${numbers.slice(6, 10)}`;
    } else if (numbers.length > 3) {
      formattedNumber = `+1(${numbers.slice(0, 3)})-${numbers.slice(3)}`;
    } else if (numbers.length > 0) {
      formattedNumber = `+1(${numbers}`;
    }

    return formattedNumber;
  };

  return (
    <form
      className="profile-general-container"
      id="profile-general-container"
      onSubmit={handleEditSubmit}
    >
      {successMessage && (
        <h1 className="profile-valid-prompt">{successMessage}</h1>
      )}
      {notSuccessMessage && (
        <h1 className="profile-invalid-prompt">{notSuccessMessage}</h1>
      )}

      <div className="icons-tabs-container-photoslider ">
        <div className="icon-minimize"></div>
        <div className="icon-maximize"></div>
        <div className="icon-close"></div>
      </div>
      <div className="profileform-body" id="profileform-body">
        <div className="input-label-profile">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={formState.email}
          />
        </div>

        <div className="input-label-profile-flex">
          <div className="input-label-profile">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={formState.name}
            />
          </div>

          <div className="input-label-profile">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              value={formState.lastName}
            />
          </div>
        </div>

        <div className="input-label-profile">
          <label htmlFor="telephone">Telephone</label>
          <input
            type="text"
            name="telephone"
            onChange={handleChange}
            value={formState.telephone}
          />
        </div>

        <div className="input-label-profile">
          <label htmlFor="address">Address</label>

          {isApiLoaded && (
            <input
              ref={autocompleteInputRef}
              type="text"
              name="address"
              onChange={handleChange}
              value={formState.address}
            />
          )}
        </div>

        <div className="input-label-profile">
          <label htmlFor="nationalID">nationalID</label>
          <input
            type="text"
            name="nationalID"
            onChange={handleChange}
            value={formState.nationalID}
          />
        </div>

        <div className="input-label-profile">
          <button type="submit" className="editprofile-submit">
            Save Changes
          </button>
        </div>
      </div>
      <div className="spotmeupicon-profile-form" id="spotmeupicon-profile-form">
        <SpotMeUpIcon />
      </div>
    </form>
  );
};

export default ProfileForm;
