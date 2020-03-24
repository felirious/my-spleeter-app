import React from "react";
// import { Link } from "react-router-dom";

export default function Captcha() {
    return (
        <div id="captcha">
            Please check and click to proceed
            <input
                type="checkbox"
                id="captcha"
                name="captcha"
                value="captcha"
            />
            <label htmlFor="vehicle1"> I am not a robot </label>
            <br />
            <button type="submit" name="button">
                YES
            </button>
        </div>
    );
}
