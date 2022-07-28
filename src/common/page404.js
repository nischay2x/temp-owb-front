import React from "react";

export default function Page404() {
  return (
    <div
      id="wrapper"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <img
        src="https://i.imgur.com/qIufhof.png"
        style={{ height: 100, width: 100 }}
      />
      <div id="info">
        <h3>This page could not be found</h3>
      </div>
    </div>
  );
}
