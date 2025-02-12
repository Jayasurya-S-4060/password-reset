import axios from "axios";

async function userLogin(params) {
  const url = import.meta.env.VITE_API_URL;
  try {
    const response = await axios.post(url + "/api/login", params, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
}

export default userLogin;
