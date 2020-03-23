import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome.js";

let component;

ReactDOM.render(component, document.querySelector("main"));

if (location.pathname === "/welcome") {
    //render upload page
    component = <Welcome />;
} else {
    // render logo
    component = <h1>THE SPLEETER APP</h1>;
}
