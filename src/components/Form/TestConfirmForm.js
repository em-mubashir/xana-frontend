import React from "react";

const TestConfirmForm = () => {
  return (
    <>
      <div className="flex flex-wrap w-auto justify-center align-middle items-center">
        <form className="w-full">
          <div className="flex flex-wrap p-7 justify-center">
            <div className="w-full mt-3 text-center">
              <h1 className="text-2xl">Are you sure you want to add test?</h1>
            </div>

            <div className="flex flex-wrap text-center mt-4">
              <button
                className="bg-blue-900 text-white text-sm px-10 py-3 rounded-xl shadow hover:bg-yellow-600 outline-none focus:outline-none m-2 w-36 transition duration-500 ease-in-out"
                type="submit"
                name="loginButton"
              >
                Add
              </button>
              <button
                className="bg-blue-200 text-white text-sm px-10 py-3 rounded-xl shadow hover:bg-blue-900 outline-none focus:outline-none m-2 w-36 transition duration-500 ease-in-out"
                type="submit"
                name="loginButton"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default TestConfirmForm;
