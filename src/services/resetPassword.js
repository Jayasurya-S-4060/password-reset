import axios from "axios";

async function resetPassword(body, token) {
  const url = import.meta.env.VITE_API_URL;
  try {
    await axios.post(url + "/api/reset-password", body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
}

export default resetPassword;
