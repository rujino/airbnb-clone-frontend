import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

export const getRooms = () =>
  axiosInstance.get("rooms/").then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
  const [, roomPk] = queryKey;
  return axiosInstance.get(`rooms/${roomPk}`).then((response) => response.data);
  //   or axiosInstance.get(`rooms/${roomPk[1]}`
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
  const [, roomPk] = queryKey;
  return axiosInstance
    .get(`rooms/${roomPk}/reviews`)
    .then((response) => response.data);
};

export const getMe = () =>
  axiosInstance.get(`users/me`).then((response) => response.data);

export const logOut = () =>
  axiosInstance
    .post("users/log-out", null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const githubLogIn = (code: string) =>
  axiosInstance
    .post(
      `/users/github`, // users/github url에 code를 post
      { code }, // code 넣어둠 backend에서 request.data를 통해 접근 가능
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);
