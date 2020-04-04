import React from "react";

export default function Twostem({ vocals, accompaniment, directory }) {
    console.log("vocals: ", vocals);
    console.log("directory: ", directory);
    if (directory && vocals && accompaniment) {
        return (
            <div id="twostem-container">
                <div>
                    <h3>Vocals</h3>
                    <br />
                    <audio
                        type="audio/wav"
                        controls
                        key={vocals}
                        src={"./output/" + directory + "/vocals.wav"}
                    ></audio>
                    <br />
                </div>

                <div>
                    <h3>Accompaniment</h3>
                    <br />
                    <audio
                        type="audio/wav"
                        controls
                        key={accompaniment}
                        src={"./output/" + directory + "/accompaniment.wav"}
                    ></audio>
                    <br />
                </div>

                <br />
                <br />
                <a href="/">Upload and spleet another file</a>
                <br />
                <br />
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
