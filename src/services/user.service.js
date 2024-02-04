import { API_URL } from "./api.service";
import axios from "axios";

const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const editUser = async (
  { name, lastName, email, telephone, address, nationalID, userProfileImage },
  setUser
) => {
  const requestBody = {
    name,
    lastName,
    email,
    telephone,
    address,
    nationalID,
    userProfileImage,
  };

  try {
    const response = await axios.put(`${API_URL}/users/edit`, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    localStorage.setItem("authToken", response.data.authToken)
    console.log("User updated:", response.data);
    console.log('response.data.user:', response.data.user)
    setUser(response.data.user);

    return response.data;
  } catch (error) {
    console.error("Line 45 - Error", error);
    throw error;
  }
};

