import axios from "axios";

async function userLogin(params) {
  const url = import.meta.env.VITE_API_URL;
  try {
    const response = await axios.post(url + "/api/login", params, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error(
      "Error user login",
      error.response ? error.response.data : error.message
    );
  }
}

export default userLogin;
