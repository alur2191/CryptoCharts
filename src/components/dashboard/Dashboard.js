import {useContext} from 'react'
import  ChartContext  from '../../context/chart/chartContext';

export default function Dashboard() {
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
                <div style={{display: 'flex', justifyContent: 'space-around',marginBottom:30}}>
                    <table>
                        <tr>
                            <thead>
                                <strong>Price:</strong>
                            </thead>
                            <td>${formatNumber(marketData.current_price.usd)}
                                <span 
                                    className="small-font" 
                                    style={
                                        marketData.price_change_percentage_24h >= 0 ? 
                                        {color:'#3a9368',marginLeft: 3} : 
                                        {color:'#933a4b',marginLeft: 3}}
                                    >
                                        ({marketData.price_change_percentage_24h.toFixed(2)}%)
                                </span>
                            </td>
                        </tr>
                        <tr>
                        <thead><strong>ATH:</strong></thead>
                            <td>${marketData.ath.usd.toLocaleString('en')}
                                <span className="small-font" style={
                                    marketData.ath_change_percentage.usd >= 0 ?
                                    {color:'#3a9368',marginLeft: 3} :
                                    {color:'#933a4b',marginLeft: 3}}
                                >
                                    ({marketData.ath_change_percentage.usd.toFixed(2)}%)
                                </span>
                            </td>
                            
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <thead><strong>MCap:</strong></thead>
                            <td>${numberConverter(marketData.market_cap.usd)}</td>
                        </tr>
                        <tr>
                            <thead><strong>Vol:</strong></thead>
                            <td>
                                ${numberConverter(marketData.total_volume.usd)}
                            </td>
                                
                            
                        </tr>
                        
                    </table>
                    <table>
                        
                        <tr>
                            <thead><strong>Supply:</strong></thead>
                            <td>
                                <span>
                                    {marketData.total_supply !== null ? attachSymbol(coinData.id)+numberConverter(marketData.total_supply) : `∞`}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <thead><strong>Circulating:</strong></thead>
                            <td>
                                <span>
                                    {attachSymbol(coinData.id)}{numberConverter(marketData.circulating_supply)}
                                </span>
                            </td>
                            
                        </tr>
                        </table>
                        <table>
                        <tr>
                            <thead><strong>Explorer:</strong></thead>
                            <td>
                                <a href={coinData.links.blockchain_site[0]}>Link</a>
                            </td>
                        </tr>
                        <tr>
                            <thead><strong>Supply:</strong></thead>
                            <td>
                                <span>
                                    ${numberConverter(marketData.circulating_supply)} / {marketData.total_supply !== null ? `$`+ numberConverter(marketData.total_supply) : `∞`}
                                </span>
                                
                            </td>
                                
                            
                        </tr>
                        
                    </table>
                    
                    
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