import axios from "axios";

async function registerUser(params) {
  const url = import.meta.env.VITE_API_URL;
  try {
    const response = await axios.post(url + "/api/register", params, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
}

export default registerUser;
