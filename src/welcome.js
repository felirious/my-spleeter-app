import React from "react";
import Uploader from "./uploader.js";
import { BrowserRouter, Route } from "react-router-dom";
import Captcha from "./captcha.js";
import axios from "./axios.js";
import logo from "./logo.png";

export default class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {
            whatevs: true
        };
        this.submitUpload = this.submitUpload.bind(this);
        // this.captcha = this.captcha.bind(this);
    }
    submitUpload(file) {
        // e.preventDefault();
        var formData = new FormData();
        formData.append("file", file);
        axios
            .post("/upload", formData)
            .then(resp => {
                console.log("stuff just happened");
                console.log("new profile pic URL: ", resp.data.profile_pic);
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
    }
    render() {
        return (
            <div>
                <div id="title-container">
                    <h2>Spleet up your audio files!</h2>
                    <h1>
                        <img src={logo} />
                    </h1>
                    <h3>
                        A powerful tool for musicians and music-lovers alike
                    </h3>
                    <BrowserRouter>
                        <Route exact path="/captcha" component={Captcha} />
                        <Route
                            exact
                            path="/uploader"
                            render={() => (
                                <Uploader
                                    handleChange={e => {
                                        e.preventDefault();
                                        console.log(
                                            "handleChange is happening"
                                        );
                                        console.log(e.target.files);
                                    }}
                                    submitUpload={this.submitUpload}
                                />
                            )}
                        />
                    </BrowserRouter>
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
            </div>
        );
    }
}
