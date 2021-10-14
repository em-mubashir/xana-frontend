import React from "react";
import { loadUserAsync } from "../../redux/user/users.thunk";
import { useDispatch } from "react-redux";
// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

export default function Dashboard() {
  const dispatch = useDispatch();
  const btnClicked = () => {
    console.log("btn clicked");
    dispatch(loadUserAsync());
  };
  return (
    <>
      <div className='flex flex-wrap'>
        <button className='btn' onClick={btnClicked}>
          {" "}
          my button
        </button>
        <div className='w-full xl:w-8/12 mb-12 xl:mb-0 px-4'>
          <CardLineChart />
        </div>
        <div className='w-full xl:w-4/12 px-4'>
          <CardBarChart />
        </div>
      </div>
      <div className='flex flex-wrap mt-4'>
        <div className='w-full xl:w-8/12 mb-12 xl:mb-0 px-4'>
          <CardPageVisits />
        </div>
        <div className='w-full xl:w-4/12 px-4'>
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
}
