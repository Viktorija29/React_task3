import './index.scss';
import {useState} from "react";

function App() {
    const [count, setCount] = useState(0)

    const onClickPlus = () => {
        setCount(count + 1)
        console.log(count)
    }
    const onClickMinus = () => {
        setCount(count - 1)
        console.log(count)
    }

    return (
        <div className="App">
            <div>
                <h2>Счетчик:</h2>
                <h1>{count}</h1>
                <button onClick={onClickMinus} className="minus">- Минус</button>
                <button onClick={onClickPlus} className="plus">Плюс +</button>
            </div>
        </div>
    );
}

export default App;