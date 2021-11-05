import React from "react";
// import MUIDataTable from "mui-datatables";

// components

import CardSettings from "components/Cards/CardSettings.js";

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
          {/* <MUIDataTable
            title={"Employee List"}
            data={data}
            columns={columns}
            options={options}
          /> */}
        </div>
      </div>
    </>
  );
}
