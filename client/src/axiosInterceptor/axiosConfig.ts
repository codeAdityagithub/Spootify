// axiosConfig.js
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { UserType } from '../types';

interface decodeType extends UserType{
  iat:number;
  exp:number;
}

const instance = axios.create();

// Request interceptor
instance.interceptors.request.use(
  async (config) => {
    // taking token from header
    const authHeader = config.headers["authorization"];
    if (!authHeader) return config;

    const token = authHeader.split(" ")[1];
    
    let currentDate = new Date();
      const decodedToken:decodeType = jwtDecode(token);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = (await axios.get(`${import.meta.env.API_URL}/auth/refresh`)).data;
        config.headers["authorization"] = "Bearer " + data.accessToken;
      }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // Response interceptor
// instance.interceptors.response.use(
//   (response) => {
//     // You can modify the response data here
//     return response;
//   },
//   (error) => {
//     // Handle error responses globally
//     return Promise.reject(error);
//   }
// );

export default instance;