import React, {useEffect, useRef, useState} from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
    const [fromCurrency, setFromCurrency] = useState('rub')
    const [toCurrency, setToCurrency] = useState('usd')
    const [fromPrice, setFromPrice] = useState(0)
    const [toPrice, setToPrice] = useState(1)
    // const [rates, setRates] = useState({})

    const ratesRef = useRef({})

    useEffect(() => {
        fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json')
            .then((res) => res.json())
            .then((json) => {
                // setRates(json.usd)
                ratesRef.current = json.usd
                onChangeToPrice(1)
                // console.log(json.usd)
            })
            .catch((err) => {
                console.log(err)
                alert('Не удалось получить информацию')
            })
    }, [])

    const onChangeFromPrice = (value) => {
        const price = value / ratesRef.current[fromCurrency]
        const result = price * ratesRef.current[toCurrency]
        setToPrice(result.toFixed(3))
        setFromPrice(value)
    }

    const onChangeToPrice = (value) => {
        const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value
        setFromPrice(result.toFixed(3))
        setToPrice(value)
    }

    useEffect(() => {
        onChangeFromPrice(fromPrice)
    }, [fromCurrency])

    useEffect(() => {
        onChangeToPrice(toPrice)
    }, [toCurrency])

  return (
    <div className="App">
      <Block value={fromPrice}
             currency={fromCurrency}
             onChangeCurrency={setFromCurrency}
             onChangeValue={onChangeFromPrice}/>
      <Block value={toPrice}
             currency={toCurrency}
             onChangeCurrency={setToCurrency}
             onChangeValue={onChangeToPrice}/>
    </div>
  );
}

export default App;
