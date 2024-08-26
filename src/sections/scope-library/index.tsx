import React from "react";
import { MobileView } from "react-device-detect";
import CardInfo from "./CardInfo";

const ScopeLibrarySections = () => {
  return (
    <React.Fragment>
      <MobileView>
        <CardInfo />;
      </MobileView>
      <CardInfo />
    </React.Fragment>
  );
};

export default ScopeLibrarySections;
