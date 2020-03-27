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
                    <br />
                    <audio
                        ref={elemRef}
                        type="audio/wav"
                        key={vocals}
                        controls
                        src={vocals}
                    ></audio>
                    <br />
                    <br />
                    <audio
                        type="audio/wav"
                        controls
                        src="./output/Z3eOIRHhQqeJRd-dtoycmWkCkqr33C-6/vocals.wav"
                    ></audio>
                </div>

                <div>
                    <h3>Accompaniment</h3>
                    <br />
                    <br />
                    <audio
                        ref={elemRef}
                        type="audio/wav"
                        controls
                        key={accompaniment}
                        src={accompaniment}
                    ></audio>
                    <br />
                    <br />
                    <audio controls>
                        <source
                            src="./output/Z3eOIRHhQqeJRd-dtoycmWkCkqr33C-6/accompaniment.wav"
                            type="audio/wav"
                        />
                    </audio>
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
