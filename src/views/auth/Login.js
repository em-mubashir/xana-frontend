import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div className="mx-auto px-4 h-auto">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full h-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full h-full mb-6 rounded-lg bg-trueGray-200 border-0">
              <div className="rounded-t flex justify-center mb-12 px-6 py-6 mt-8">
                <img
                  alt="..."
                  className="mr-1 w-auto h-auto"
                  src={require("assets/img/xana-login.svg").default}
                />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-black text-center mb-6 font-bold text-lg">
                  <h1>Log in as Admin</h1>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <input
                      type="email"
                      className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                      placeholder="User name/Email"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <input
                      type="password"
                      className="px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                      placeholder="Password"
                    />
                  </div>

                  <div className="w-full text-right">
                    <Link
                      to="/auth/forgetPass"
                      className="text-yellow-600 font-bold"
                    >
                      <small>Forget Password?</small>
                    </Link>
                  </div>

                  <div className="text-center mt-4">
                    <button
                      className="bg-blue-900 text-white text-sm px-12 py-3 rounded-xl shadow hover:bg-blue-600 outline-none focus:outline-none mr-1 mb-1 w-auto ease-linear transition-all duration-150"
                      type="button"
                    >
                      Log In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="px-3 py-3 flex align-bottom relative mt-20">
              <img
                alt="..."
                className="mr-1"
                src={require("assets/img/copyright.svg").default}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
