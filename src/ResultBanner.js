import React from "react";
import "./resultBanner.css";

export default class ResultBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: props.result,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.result !== prevProps.result) {
            this.setState({ result: this.props.result });
        }
    }

    resultBanner = () => {
        return (
            <div className="results">
                <p>
                    Your typing speed is{" "}
                    <code>{this.state.result.totalTypedWords + " words "}</code>
                    per minute.
                </p>
                <div>
                    <p>Right words : {this.state.result.right}</p>
                    <p>Wrong words : {this.state.result.wrong}</p>
                </div>
            </div>
        );
    };

    warningBanner = () => {
        return (
            <div className=" warning">
                <p>Oops! You didn't typed anything. Try Again</p>
            </div>
        );
    };
    render() {
        let Banner;
        if (this.state.result.totalTypedWords) {
            Banner = this.resultBanner;
        } else Banner = this.warningBanner;
        return (
            <div id="resultbanner" className="hidden">
                <Banner />
            </div>
        );
    }
}
