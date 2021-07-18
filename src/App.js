import "./App.css";
import Typing from "./Typing";

const TypingComponent = Typing;

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="app-title">Welcome to the Typing Master</h1>
                <p className="faded">Let the fun begin...</p>
                <p className="faded">
                    Instruction: Type the below sentence correctly and as
                    quickly as possible
                </p>
                <TypingComponent />
            </header>
        </div>
    );
}

export default App;
