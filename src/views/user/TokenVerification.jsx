import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "../../services/users.service";
import { BASE_URL } from "../../environment";
// import { useSelector, useDispatch } from "react-redux";

export default function TokenVerification() {
  // const data = useSelector((state) => state);
  // const dispatch = useDispatch();
  const [state, setState] = useState("");
  let { token } = useParams();

  useEffect(async () => {
    try {
      const { data } = await UserService.verifyEmail(token);
      setState(data);
    } catch (error) {
      console.log("error ::: ", error);
    }
  }, []);

  return (
    <>
      <div>user page</div>
      {state.success ? (
        <h1 style={{ textAlign: "center", fontSize: "40px" }}>
          User Verified successfully
        </h1>
      ) : (
        <h1 style={{ textAlign: "center", fontSize: "40px" }}>
          Unable to verify
        </h1>
      )}
    </>
  );
}
