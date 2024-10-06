import axios from "axios";
import { API_URL } from "../config/api";

export const getMarsRoverPhotos = (params) => {
  return axios.get(`${API_URL}/nasa/mars-rover-photos`, {
    params,
  });
};

export const getApodPhotos = (params) => {
  return axios.get(`${API_URL}/nasa/apod-photos`, {
    params,
  });
};
