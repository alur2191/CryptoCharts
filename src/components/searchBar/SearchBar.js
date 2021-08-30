import React,{useContext} from 'react'
import {useEffect,useState} from 'react'
import ChartContext from '../../context/chart/chartContext';
import ThemeButton from '../themeButton/ThemeButton'
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

export default function SearchBar() {
    const chartContext = useContext(ChartContext)

    const {requestCoin, coin:{coinData}} = chartContext;

    const [coins,setCoins]= useState({})
    const [text,setText]=useState('')
    const [suggestions,setSuggestions]=useState([])
    
    useEffect(() => {
        var loadCoins = async() => {
            let data = await CoinGeckoClient.coins.all({per_page:100});
            setCoins(data)
        };

        
        loadCoins()
    },[])
    
    const onChangeHandler = (text) => {
        let matches = []
        if (text.length>1) {
            matches = coins.data.filter(coin=>{
            const regex = new RegExp(`${text}`, "gi")

            return coin.id.match(regex)
            })
        }
        console.log('matches',matches)
        setSuggestions(matches)
        setText(text)
    }

    const search = (suggestion) => {
        requestCoin(suggestion) 
        setText('')
        setSuggestions([])
    }

        
    return (
        <div>
            <div id="search" className="container">
                <div id="search-bar">
                    <span>{coinData && coinData.market_data.market_cap_rank}</span>
                    <input 
                    type="text" 
                    className="search-bar" 
                    onChange={e=> onChangeHandler(e.target.value)} 
                    value={text}  
                    placeholder={ coinData && coinData.name+' ('+coinData.symbol.toUpperCase()+')' }
                    />
                    <ThemeButton />
                </div>
                <div id='suggestions'  onBlur={console.log(this)}>
                {suggestions && suggestions
                    .map((suggestion,i)=>
                        <div key={i} 
                            className="suggestion" 
                            style={{
                                display:'flex',
                                justifyContent:'space-between'
                            }}
                            onClick={()=>{
                                search(suggestion.id)
                            }}
                            
                            >
                            <div style={{display:'flex'}}>
                                <span className="secondary" style={{marginRight:20,width:20, display:'flex',justifyContent:'center'}}>
                                    {suggestion.market_data.market_cap_rank}
                                </span>
                                {suggestion.name}
                                <span  className="secondary" style={{marginLeft:5}}>
                                    ({suggestion.symbol.toUpperCase()})
                                </span>
                            </div>
                            <div style={{display:'flex'}}>
                                <span style={{marginRight:10}}>
                                    ${suggestion.market_data.current_price.usd}
                                </span>
                                {suggestion.market_data.price_change_percentage_24h.toFixed(1).includes("-")
                                ?<span style={{color:"#933a4b"}}>
                                    {suggestion.market_data.price_change_percentage_24h.toFixed(1)}%
                                </span>
                                :<span style={{color:"#3a9368"}}>
                                    {suggestion.market_data.price_change_percentage_24h.toFixed(1)}%
                                </span>}
                            </div>
                        </div>
                    )
                }
                </div>
                
            </div>
        </div>
    )
}
