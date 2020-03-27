import React from "react";

export default function Fourstem({ vocals, bass, drums, other }) {
    if (vocals && bass && drums && other) {
        return (
            <div id="fourstem-container">
                <div id="fourstem-element">
                    <h3>Vocals</h3>
                    <br />
                    <br />
                    <audio
                        controls
                        type="audio/wav"
                        key={vocals}
                        src={vocals}
                    ></audio>
                </div>
                <div>
                    <h3>Bass</h3>
                    <br />
                    <br />
                    <audio
                        controls
                        type="audio/wav"
                        key={bass}
                        src={bass}
                    ></audio>
                </div>
                <div>
                    <h3>Drums</h3>
                    <br />
                    <br />
                    <audio
                        controls
                        type="audio/wav"
                        key={drums}
                        src={drums}
                    ></audio>
                </div>
                <div>
                    <h3>Other</h3>
                    <br />
                    <br />
                    <audio
                        controls
                        type="audio/wav"
                        key={other}
                        src={other}
                    ></audio>
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
