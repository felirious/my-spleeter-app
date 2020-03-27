import React, { useRef } from "react";

export default function Twostem({ vocals, accompaniment }) {
    const elemRef = useRef();
    console.log("vocals: ", vocals);
    console.log("elemRef.current: ", elemRef.current);
    if (vocals && accompaniment) {
        return (
            <div id="twostem-container">
                <div>
                    <h3>Vocals</h3>
                    <br />
                    <audio
                        type="audio/wav"
                        controls
                        src="./output/mr-mustard/vocals.wav"
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
                        src="./output/mr-mustard/accompaniment.wav"
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
