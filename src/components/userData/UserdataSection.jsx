import React, { useEffect, useState } from "react";

import UserbasicData from "./Detail/UserbasicData";
import UsermatchData from "./Detail/UsermatchData";
import Search from "../layout/Search";
import { division, matchType } from "../../api/basic";
import Header from "../layout/Header";
import IsLoading from "../layout/IsLoading";

const UserdataSection = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    matchType();
    division();
  }, []);

  return (
    <>
      <Header></Header>
      <div className="userdata_wrap">
        <Search></Search>
          { isLoading ? (
            <>
              <UserbasicData></UserbasicData>
              <UsermatchData></UsermatchData>
            </>
          ) : (
            <IsLoading></IsLoading>
          )}
      </div>
    </>
  )
}

export default UserdataSection;