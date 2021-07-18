import React from "react";
import InputArea from "./InputArea";
import "./inputarea.css";
import sentences from "./Sentences.js";

/* const sentences = [
    "This is a sentence 1",
    "This is a sentence 2",
    "This is a sentence 3",
    "This is a sentence 4",
    "This is a sentence 5",
]; */

class Typing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySentence: this.newSentence(),
        };
    }

    newSentence = () => {
        let rand = Math.floor(Math.random() * sentences.length);
        return sentences[rand];
    };

    handleOnClick = (event) => {
        console.log("refresh clicked");
        let data = this.state;
        data.displaySentence = this.newSentence();
        this.setState(data);
        console.log(this.state.displaySentence);
    };

    render() {
        let sentence = this.state.displaySentence;
        return (
            <div>
                <div>
                    <button id="refresh-btn" onClick={this.handleOnClick}>
                        Refresh
                    </button>
                    <h4 id="sentence">{sentence}</h4>
                </div>
                <InputArea
                    // key={sentence}
                    sentence={sentence}
                />
            </div>
        );
    }
}

export default Typing;
