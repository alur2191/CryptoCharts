import {useEffect,useContext} from 'react'
import { useMediaQuery } from 'react-responsive'
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    CartesianGrid,
} from "recharts";
import  ChartContext  from '../../context/chart/chartContext';



export default function Chart() {
    const isDesktop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isTablet = useMediaQuery({
        query: '(min-width: 768px)'
    })
    const isMobile = useMediaQuery({
        query: '(max-width: 768px)'
    })

    const {requestCoin, coin: {marketData,startPrice,timeInterval}} = useContext(ChartContext)
    
    useEffect(() => {  
        requestCoin('bitcoin');
        
    },[])

    const formatNumber = (number) => {
        if(number >= 1) {
            return `$${number.toLocaleString('en')}`
        } else {
            return `$${number}`
        }
    }
    
    const processChart = (device) => {
        var mobileChart = []

        for (var i = 0; i < marketData.length; i = device === 'mobile'? i+3:i+2) {
            mobileChart.push(marketData[i]);
        };
        return mobileChart
    }


    const setChart = () => {
        switch(true){
            case isMobile:
                return processChart('mobile')
            case isTablet:
                return processChart('tablet')
            default:
                return marketData
        } 
    }
    
    return (
        <div className="container">
            
            <ResponsiveContainer width="100%" height={499} margin={{ top: 0, left: 0, right: 0, bottom: 0 }} >
                <AreaChart data={marketData && setChart()}>
                    <Area 
                        dataKey="price" 
                        stroke="#aaaaaa" 
                        fill="#c3c4c5" 
                        // 3C5295
                        fillOpacity="0.3" 
                    />
                    <XAxis 
                        dataKey="timestamp" 
                        interval={timeInterval} 
                        stroke="#aaaaaa"
                        // 263556 
                        angle={-45} 
                        style={{fontSize:9, fill:'#747474'}}
                        // 5777B9 
                        dy={10} 
                        dx={-7}
                    />
                    <YAxis 
                        angle={-45}  
                        dx={-7} 
                        tickCount={8} 
                        stroke="#aaaaaa" 
                        domain={[startPrice, "auto"]} 
                        style={{fontSize:9, fill:'#747474'}}
                        tickFormatter={formatNumber}
                    />
                    <CartesianGrid 
                        stroke="black" 
                        strokeDasharray="3 3" 
                        strokeOpacity="0.1"
                    />
                    </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
