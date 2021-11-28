import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../../environment";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";

const UserDropdown = () => {
  let history = useHistory();

  const logoutFunc = () => {
    console.log(localStorage.getItem("refresh_token"));
    var data = JSON.stringify({
      refreshToken: localStorage.getItem("refresh_token"),
    });
    var config = {
      method: "post",
      url: BASE_URL + "user/logout",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data.success) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          history.push("/");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="mr-1 ">
        <Avatar alt="Profile Picture" src="" />
      </div>

      <div className="flex mr-8 items-center">Hello, User</div>

      <div className=" ">
        <button
          className="bg-red-200 text-white text-sm py-2 w-10 h-10 rounded-md shadow hover:bg-red-700 outline-none focus:outline-none transition duration-500 ease-in-out"
          onClick={() => logoutFunc()}
        >
          <LogoutIcon />
        </button>
      </div>
    </>
  );
};

export default UserDropdown;
