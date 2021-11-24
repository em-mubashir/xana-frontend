import React from "react";
import { createPopper } from "@popperjs/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../../environment";

const UserDropdown = () => {
  let history = useHistory();

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

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
      <button onClick={() => logoutFunc()}>logout</button>
      {/*
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 bg-blue-600 inline-flex items-center justify-center rounded-full"></span>
          <span className="w-auto h-12 text-coolGray-500 inline-flex items-center justify-center ml-1 font-semibold">
            Hello, User
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg w-auto h-auto"
        }
      >
        <a
          href=" "
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={() => logoutFunc()}
        >
          Log Out
        </a>
      </div>
      */}
    </>
  );
};

export default UserDropdown;
