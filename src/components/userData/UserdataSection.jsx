import React, { useEffect } from "react";

import UserbasicData from "./Detail/UserbasicData";
import UsermatchData from "./Detail/UsermatchData";
import Search from "../layout/Search";
import { division, matchType } from "../../api/basic";
import Header from "../layout/Header";

const UserdataSection = () => {
  useEffect(() => {
    matchType();
    division();
  }, []);

  return (
    <>
      <Header></Header>
      <div className="userdata_wrap">
        <Search></Search>
          <UserbasicData></UserbasicData>
          <UsermatchData></UsermatchData>
      </div>
    </>
  )
}

export default UserdataSection;