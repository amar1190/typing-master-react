import React from "react";
import ResultBanner from "./ResultBanner";
import "./inputarea.css";

export default class InputArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerStart: 0,
            defaultValue: "Start typing above sentence here and submit",
            value: "Start typing above sentence here and submit",
            sentence: props.sentence,
            classname: "faded",
            caseSensitive: false,
            result: {
                totalTypedWords: 0,
                right: 0,
                wrong: 0,
            },
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.sentence !== prevProps.sentence) {
            let data = this.state;
            data.sentence = this.props.sentence;
            this.setState(data);
        }
    }

    handleChange = (event) => {
        let data = this.state;
        data.value = event.target.value;
        data.classname = "";
        this.setState(data);
    };

    handleSubmit = (event) => {
        event.preventDefault();

        let inputText = document.getElementById("user-text").textContent;

        //don't compare if submit is clicked directly without typing
        if (inputText.trim() !== this.state.defaultValue) {
            let timerEnd = new Date();

            let sentence = this.state.sentence
                .trim()
                .replace("/s+/", "")
                .split(" ");

            let inputTextArr = inputText.trim().replace("/s+/", "").split(" ");

            let data = this.state;

            data.result.totalTypedWords =
                data.result.right =
                data.result.wrong =
                    0;

            //toggle case-sensitive or insensitive checking
            if (!this.state.caseSensitive) {
                inputTextArr.forEach(
                    (val, i) => (inputTextArr[i] = val.toLowerCase())
                );
                sentence.forEach((val, i) => (sentence[i] = val.toLowerCase()));
            }

            for (
                let i = 0;
                i < inputTextArr.length && i < sentence.length;
                i++
            ) {
                if (inputTextArr[i] === sentence[i]) {
                    data.result.right += 1;
                } else {
                    data.result.wrong += 1;
                }
            }
            if (inputTextArr.length > sentence.length) {
                data.result.wrong += inputTextArr.length - sentence.length - 1;
                console.log("Sentence exhausted");
            }

            if (sentence.length > inputTextArr.length > 0) {
                data.result.wrong += sentence.length - inputTextArr.length;
            }

            let totalTimeTakenInSec = (timerEnd - this.state.timerStart) / 1000;
            let totalTimeTakenInMin = totalTimeTakenInSec / 60;
            data.result.totalTypedWords = Math.round(
                inputText.length / 5 / totalTimeTakenInMin
            );
            this.setState(data);
        }
        document.getElementById("resultbanner").className = "visible";
        document.getElementById("user-text").blur();
    };

    handleFocus = (event) => {
        // console.log("FOCUS IN ", event.target.value);
        let data = this.state;
        // if (event.target.value === this.state.defaultValue) {
        //     data.value = "";
        // }
        data.value = "";
        // console.log(data.result);
        data.timerStart = new Date();
        document.getElementById("resultbanner").className = "hidden";
        this.setState(data);
    };

    handleFocusOut = (event) => {
        // console.log("FOCUS OUT ", event.target.value);
        if (event.target.value.trim() === "") {
            let data = this.state;
            data.classname = "faded";
            data.value = data.defaultValue;
            this.setState(data);
            //   event.target.value = this.state.defaultValue;
        }
    };

    handleKeypress = (event) => {
        if (event.which === 13 && !event.shiftKey) {
            // console.log("TEXTAREA key press");
            this.handleSubmit(event);
        }
    };

    handleCheckboxClick = (previousEvent) => {
        let data = this.state;
        data.caseSensitive = !data.caseSensitive;
        this.setState(data);
    };

    handleCheckboxKeypress = (previousEvent) => {
        previousEvent.preventDefault();
        if (previousEvent.which === 13) {
            console.log("CHECKBOX key press");
            let box = document.getElementsByClassName("checkbox")[0];
            box.checked = !box.checked;
            let data = this.state;
            data.caseSensitive = !data.caseSensitive;
            this.setState(data);
        }
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <textarea
                        id="user-text"
                        rows="4"
                        cols="80"
                        type="textarea"
                        className={this.state.classname}
                        value={this.state.value}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleFocusOut}
                        onKeyPress={this.handleKeypress}
                    />
                    <br></br>
                    <label>Case Sensitive checking</label>
                    <input
                        className="checkbox"
                        type="checkbox"
                        onClick={this.handleCheckboxClick}
                        onKeyPress={this.handleCheckboxKeypress}
                    />
                    <br></br>
                    <input className="submit" type="submit" value="Submit" />
                </form>
                <ResultBanner result={this.state.result} />
            </div>
        );
    }
}
