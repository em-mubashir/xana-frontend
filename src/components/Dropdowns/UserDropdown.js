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
          localStorage.removeItem("First_Name");
          history.push("/");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex mr-8 items-center font-bold">
        Hello,{" "}
        {localStorage.getItem("First_Name")
          ? localStorage.getItem("First_Name")
          : "Admin"}
      </div>

      <div className=" ">
        <button
          className="hover:bg-red-400 text-white text-center text-sm py-2 w-24 h-10 rounded-md shadow bg-red-700 outline-none focus:outline-none transition duration-500 ease-in-out"
          onClick={() => logoutFunc()}
        >
          <LogoutIcon fontSize="small" /> Logout
        </button>
      </div>
    </>
  );
};

export default UserDropdown;
