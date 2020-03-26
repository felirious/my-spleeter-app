import React from "react";
import Uploader from "./uploader.js";
import axios from "./axios.js";

export default class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {
            whatevs: true
        };
        this.submitUpload = this.submitUpload.bind(this);
        this.captcha = this.captcha.bind(this);
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
                // this.setState({
                //     profile_pic: resp.data.profile_pic,
                //     uploader: false
                // });
            })
            .catch(err => {
                console.log("err in POST /upload: ", err);
            });
    }
    captcha(e) {
        e.preventDefault();
        console.log("button was clicked");
        console.log("e.target: ", e.target);
        console.log("this.state: ", this.state);
        this.setState({
            captcha: true
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
                {!this.state.captcha && (
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
                {this.state.captcha && (
                    <Uploader submitUpload={this.submitUpload} />
                )}
            </div>
        );
    }
}
