import React from "react";
import Uploader from "./uploader.js";
import axios from "./axios.js";
import Twostem from "./twostem.js";
import Fourstem from "./fourstem.js";

export default class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {
            // whatevs: true,
            captchaVisible: true
        };
        this.submitUpload = this.submitUpload.bind(this);
        this.captcha = this.captcha.bind(this);
        this.twostems = this.twostems.bind(this);
        this.fourstems = this.fourstems.bind(this);
    }
    submitUpload(file) {
        console.log("upload is happening");
        var formData = new FormData();
        formData.append("file", file);
        console.log("formData: ", formData);
        axios
            .post("/upload", formData)
            .then(resp => {
                console.log("stuff just happened");
                console.log("resp.data: ", resp.data);
                console.log("state before set: ", this.state);
                this.setState({
                    original_file: resp.data.rows[0].file,
                    original_filename: resp.data.rows[0].filename,
                    playerVisible: true,
                    uploaderInvisible: true
                });
                console.log("state after set: ", this.state);
            })
            .catch(err => {
                console.log("err in POST /upload: ", err);
            });
    }
    twostems(e) {
        e.preventDefault();
        console.log("twostems");
        console.log("original_filename:", this.state.original_filename);
        axios
            .get("/twostems/" + this.state.original_filename)
            .then(response => {
                console.log("resp.data: ", response.data);
                if (response.data.success) {
                    console.log("directory: ", response.data.directory);
                    this.setState({
                        twostem_file_accompaniment: `./output/${response.data.directory}/accompaniment.wav`,
                        twostem_file_vocals: `./output/${response.data.directory}/vocals.wav`,
                        twostemVisible: true,
                        playerInvisible: true
                    });
                }
            })
            .catch(err => {
                console.log("err: ", err);
            });
    }
    fourstems(e) {
        e.preventDefault();
        console.log("fourstems");
        axios
            .get("/fourstems/" + this.state.original_filename)
            .then(response => {
                console.log("resp.data: ", response.data);
                if (response.data.success) {
                    console.log("directory: ", response.data.directory);
                    this.setState({
                        fourstem_file_vocals: `./output/${response.data.directory}/accompaniment.wav`,
                        fourstem_file_bass: `./output/${response.data.directory}/vocals.wav`,
                        fourstem_file_drums: `./output/${response.data.directory}/drums.wav`,
                        fourstem_file_other: `./output/${response.data.directory}/other.wav`,
                        fourstemVisible: true,
                        playerInvisible: true
                    });
                }
            })
            .catch(err => {
                console.log("err: ", err);
            });
    }
    captcha(e) {
        e.preventDefault();
        console.log("button was clicked");
        console.log("e.target: ", e.target);
        console.log("this.state: ", this.state);
        this.setState({
            captchaInvisible: true,
            uploaderVisible: true
        });
    }
    render() {
        return (
            <div>
                <div id="title-container">
                    <h2>Spleet up your audio files!</h2>
                    <h1>
                        <img src="./logo.png" />
                    </h1>
                    <h3>
                        A powerful tool for musicians and music-lovers alike
                    </h3>
                </div>
                {!this.state.captchaInvisible && (
                    <div id="captcha">
                        <h3>Please check and click to proceed:</h3>
                        <input
                            type="checkbox"
                            id="captcha"
                            name="captcha"
                            value="captcha"
                        />
                        <label id="label" htmlFor="vehicle1">
                            I am not a robot
                        </label>
                        <br />
                        <button
                            onClick={this.captcha}
                            id="yes"
                            type="submit"
                            name="button"
                        >
                            YES
                        </button>
                    </div>
                )}
                {this.state.captchaInvisible &&
                    this.state.uploaderVisible &&
                    !this.state.uploaderInvisible && (
                        <Uploader
                            submitUpload={this.submitUpload}
                            original_file={this.original_file}
                        />
                    )}
                {this.state.uploaderInvisible &&
                    this.state.playerVisible &&
                    !this.state.playerInvisible &&
                    !this.state.twostemVisible &&
                    !this.state.fourstemVisible(
                        <div id="player">
                            <h3>Your original file:</h3>
                            <br />
                            <br />
                            <audio
                                controls
                                src={this.state.original_file}
                            ></audio>
                            <br />
                            <br />
                            <h4>Choose a split option:</h4>
                            <p>
                                <strong>2 tracks</strong> will give you a vocals
                                track and an accompaniment track.
                            </p>
                            <p>
                                <strong>4 tracks</strong> will give you a vocals
                                track, one track each for bass and drums, and
                                one track for all the other instruments
                                combined.
                            </p>
                            <br />
                            <div id="buttons">
                                <button
                                    className="stem"
                                    onClick={this.twostems}
                                    type="button"
                                    name="2stem"
                                >
                                    2 tracks
                                </button>
                                <button
                                    className="stem"
                                    onClick={this.fourstems}
                                    type="button"
                                    name="4stem"
                                >
                                    4 tracks
                                </button>
                            </div>
                        </div>
                    )}
                {this.state.twostemVisible && (
                    <Twostem
                        vocals={this.state.twostem_file_vocals}
                        accompaniment={this.state.twostem_file_accompaniment}
                    />
                )}
                {this.state.fourstemVisible && (
                    <Fourstem
                        vocals={this.state.fourstem_file_vocals}
                        bass={this.state.fourstem_file_bass}
                        drums={this.state.fourstem_file_drums}
                        other={this.state.fourstem_file_other}
                    />
                )}
            </div>
        );
    }
}
