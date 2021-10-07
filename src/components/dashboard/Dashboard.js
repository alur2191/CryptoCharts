import {useContext} from 'react'
import  ChartContext  from '../../context/chart/chartContext';
import ThemeContext from '../../context/theme/themeContext'

export default function Dashboard() {
    const themeContext = useContext(ThemeContext)
    const {darkTheme} = themeContext
    const chartContext = useContext(ChartContext)
    const {coin:{coinData}}= chartContext

    const formatNumber = (number) => number >= 1 ?number.toLocaleString('en') : `$${number}`

    const numberConverter = (num) => {
        switch(true){
            case num > 999 && num < 999999:
                return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1k < 1M 
            case num > 999999 &&num < 999999999:
                return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1M < 1B
            case num > 999999999 &&num < 999999999999:
                return (num/1000000000).toFixed(1) + 'B'; // convert to B for number from > 1B < 1T 
            case num > 999999999999:
                return (num/1000000000000).toFixed(1) + 'T'; // convert to T for number from > 1T  
            default:
                return num;
        }
    }
    const attachSymbol = (id) => {
        switch(true){
            case(id==='bitcoin'):
                return '₿';
            case(id==='ethereum'):
                return 'Ξ';
            default:
                return ''
        }
    }
    const marketData = coinData && coinData.market_data

    return(
        coinData !== undefined ? 
            <div className="container">
                <div id="dashboard" style={{color:darkTheme?'#adaabe':'#747474'}}>
                    <div>
                        <strong>Price:</strong>
                        ${formatNumber(marketData.current_price.usd)}
                        <span 
                            className="small-font" 
                            style={
                                marketData.price_change_percentage_24h >= 0 ? 
                                {color:'#3a9368',marginLeft: 3} : 
                                {color:'#933a4b',marginLeft: 3}}
                            >
                                ({marketData.price_change_percentage_24h.toFixed(2)}%)
                        </span>
                    </div>
                    <div>
                        <strong>MCap:</strong>
                        ${numberConverter(marketData.market_cap.usd)}
                    </div>
                    <div>
                        <strong>Vol:</strong>
                        ${numberConverter(marketData.total_volume.usd)}
                    </div>
                    <div>
                        <strong>Circulating:</strong>
                        <span>
                            {attachSymbol(coinData.id)}{numberConverter(marketData.circulating_supply)}
                        </span>
                    </div>
                    <div>
                        <strong>Explorer:</strong>
                        <a href={coinData.links.blockchain_site[0]}><i class="fas fa-link" style={{color:darkTheme?'#adaabe':'#747474'}}></i></a>
                    </div>
                    <div>
                        <strong>Supply:</strong>
                        <span>
                        ${numberConverter(marketData.circulating_supply)} / {marketData.total_supply !== null ? `$`+ numberConverter(marketData.total_supply) : `∞`}
                        </span>
                    </div>
                </div>
                <div style={{
                    display:'flex',
                    justifyContent:'space-between',
                    fontSize: 20, 
                    }}>
                    
                </div> 
            </div>
        : null
        
    )
}