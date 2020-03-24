import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome.js";

let component;

if (location.pathname === "/welcome") {
    //render upload page
    component = <Welcome />;
} else {
    // render logo
    component = <h1>THE SPLEETER APP</h1>;
}

ReactDOM.render(component, document.querySelector("main"));
