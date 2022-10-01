import React from "react";
import ReactDOM from "react-dom"; 

import App from "./App";
app.get("/", (req, res) => {
  res.sendFile(__dirname + "./public/index.html");
});

ReactDOM.render(<App/>,document.querySelector("#root"));

