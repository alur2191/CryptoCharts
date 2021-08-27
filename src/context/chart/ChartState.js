import React, { useReducer} from 'react';
import axios from 'axios';
import ChartReducer from './chartReducer'
import ChartContext from './chartContext'
import { SET_LOADING, GET_COIN } from '../types';
//const CoinGecko = require('coingecko-api');
//const CoinGeckoClient = new CoinGecko();

// Provider component 
const ChartState = ({children}) => {
    
    // Initial state
    const initialState = {
        coin: {},
        fetching: false
    }

    const [state, dispatch] = useReducer(ChartReducer, initialState);
    
    const setLoading = () =>  dispatch({ type: SET_LOADING  })
    
    const requestCoin = async(request) =>{
        setLoading()

        const marketData = await axios.get(`https://api.coingecko.com/api/v3/coins/${request}/market_chart`,{ params: {vs_currency:'usd',days:30}})

        const processTime = (date) => {
            const fullDate = new Date(date);
            return  (fullDate.getDate() + '/' + (fullDate.getMonth()+1) );
        }

        const checkDecimals = (price) => price >= 20 ? Math.round(price) : price
        
        let processedList = []
        let priceList = []
        const parse = () => marketData.data.prices.map((price) => {
            const timestamp = processTime(price[0])
            const checkedPrice = checkDecimals(price[1])
            priceList.push(price[1])
            return processedList.push({timestamp: timestamp, price: checkedPrice})
        })

        parse()

        const timeInterval = Math.round(processedList.length / 30)
        const maxPrice = Math.round(Math.max(...priceList))

        const startPrice = (price) => {
            const percentage = (price / 100) * 60;
            return Math.round(price - percentage)
        } 

        const coinData = await axios.get(`https://api.coingecko.com/api/v3/coins/${request}`,{ params: {vs_currency:'usd',days:30}})

        console.log(coinData)

        const coin = {marketData:processedList,timeInterval:timeInterval,startPrice:startPrice(maxPrice),coinData:coinData.data}
        dispatch({
            type: GET_COIN,
            payload: coin
        })
        console.log(coin);
    }

    return  (<ChartContext.Provider value={{
        coin: state.coin,
        requestCoin
    }}>
        {children}
    </ChartContext.Provider>);
}

export default ChartState;