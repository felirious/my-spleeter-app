import React from "react";

export default function Twostem({ vocals, accompaniment }) {
    if (vocals && accompaniment) {
        return (
            <div id="twostem-container">
                <div>
                    <h3>Vocals</h3>
                    <br />
                    <br />
                    <audio controls src={vocals}></audio>
                </div>
                <div>
                    <h3>Accompaniment</h3>
                    <br />
                    <br />
                    <audio controls src={accompaniment}></audio>
                </div>
            </div>
        );
    } else {
        return (
            <div id="error">
                Something went wrong. <br />
                Please <a href="/">try again</a>!
            </div>
        );
    }
}
