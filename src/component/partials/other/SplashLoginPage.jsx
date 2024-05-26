import React from "react";
import Loading from "./Loading";
function SplashLoginPage() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loading
        type={"spin"}
        color={"blue"}
        width={50}
        height={50}
        delay={2000}
      />
    </div>
  );
}

export default SplashLoginPage;
