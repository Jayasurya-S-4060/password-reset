import axios from "axios";

async function registerUser(params) {
  const url = import.meta.env.VITE_API_URL;
  try {
    const response = await axios.post(url + "/api/register", params, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("User registered:", response.data);
  } catch (error) {
    console.error(
      "Error registering user:",
      error.response ? error.response.data : error.message
    );
  }
}

export default registerUser;
