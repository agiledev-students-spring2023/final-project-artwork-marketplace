import React, { useEffect, useState, PureComponent } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts'
import './PriceAnalytics.css'

const PriceAnalytics = props => {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [allUploadedProducts, setAllProducts] = useState([])
    const [soldProducts, setSoldProducts] = useState([])
    const [unsoldProducts, setUnsoldProducts] = useState([])

    // quantity chart
    const [quantityUploadedData, setQuantityUploadedData] = useState([])
    const [soldUnsoldData, setSUData] = useState([])

    // price chart 
    const [priceUploadedData, setPriceUploadedData] = useState([])
    const [soldUnsoldPriceData, setSUPriceData] = useState([])

    const handleLogOut = async () => {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/logout`, {withCredentials: true})
        if (res.data.success === true){
            alert("You have been logged out. Please Log In again to continue.")
            localStorage.removeItem("user")
            props.setuser({})
            navigate("/")
        }
    }

    useEffect(() => {
        const getUserSoldList = async () => {
            try{
                const getUser = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/user/${props.user._id}`, 
                    {withCredentials: true}
                )
                const user = await getUser.data
                const products = await user.products_uploaded
                const productsCopy = products

                const soldProducts = await products.filter(product => product.status.toLowerCase() === "sold")
                const unsoldProducts = await products.filter(product => product.status.toLowerCase() !== "sold")

                // quantity sold vs unsold graph
                const uploadedQuantityDataObj = {name: "Items Uploaded", value: products.length}
                const soldQuantityDataObj = {name: "Quantity Sold", value: soldProducts.length}
                const unsoldQuantityDataObj = {name: "Quantity Available", value: unsoldProducts.length}

                // price sold vs unsold graph
                const soldPrice = soldProducts.map(product => product.price).reduce((prev, curr) => prev + curr, 0)
                const unsoldPrice = unsoldProducts.map(product => product.price).reduce((prev, curr) => prev + curr, 0)
                const totalPrice = soldPrice + unsoldPrice

                const uploadedPriceDataObj = {name: "Total Revenue", value: totalPrice}
                const soldPriceDataObj = {name: "Revenue Sold", value: soldPrice}
                const unsoldPriceDataObj = {name: "Revenue Unsold", value: unsoldPrice}

                // quantity chart
                setSUData([soldQuantityDataObj, unsoldQuantityDataObj])
                setQuantityUploadedData([uploadedQuantityDataObj])
                // price chart
                setSUPriceData([soldPriceDataObj, unsoldPriceDataObj])
                setPriceUploadedData([uploadedPriceDataObj])
                // general
                setAllProducts(productsCopy)
                setSoldProducts(soldProducts)
                setUnsoldProducts(unsoldProducts)
                setUser(user)
            } catch (err){
                if(err.response.status === 401){
                    handleLogOut()
                }
                else{
                    console.log(err)
                }
            }        
        }
        getUserSoldList()
    }, [])

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, payload, fill}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5
        const x = cx + radius * Math.cos(-midAngle * RADIAN)
        const y = cy + radius * Math.sin(-midAngle * RADIAN)
        if(payload.name === "Items Uploaded"){
            return (
                <text x={cx} y={cy} dy={-20} fill={fill} textAnchor="middle" dominantBaseline="central" style={{fontWeight:700}}>
                    Uploaded
                </text>
            )
        }
        else{
            return (
                <text x={x} y={y} dy={y < cy ? -20 : 0} dx={x > cx ? 20 : x < cx ? -20 : 0} fill={fill} textAnchor='middle'>
                    {payload.value}
                </text>
            )
        }
    }
    const renderCustomizedPriceLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, payload, fill}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5
        const x = cx + radius * Math.cos(-midAngle * RADIAN)
        const y = cy + radius * Math.sin(-midAngle * RADIAN)
        if(payload.name === "Total Revenue"){
            return (
                <text x={cx} y={cy} dy={-20} fill={fill} textAnchor="middle" dominantBaseline="central" style={{fontWeight:700}}>
                    Potential Revenue
                </text>
            )
        }
        else{
            return (
                <text x={x} y={y} dy={y < cy ? -20 : 0} dx={x > cx ? 20 : x < cx ? -20 : 0} fill={fill} textAnchor='middle'>
                    {"$" + payload.value}
                </text>
            )
        }
    }
  
    return (
        <div className='container priceAnalytics_container'>
            <h2 className='analyticsConatiner_heading'>Your Artist Performance</h2>
            {allUploadedProducts.length !== 0 && (
                <>
                {soldUnsoldData.length !== 0 && quantityUploadedData.length !== 0 && (
                    <div className='chart_quantityCard'>
                        <h3 className='chart_quantityHeading'>Quantity</h3>
                        <div className='analytics_row'>
                            <div className='chart_quantityChart'>
                                <ResponsiveContainer width="100%" height="170%">
                                    {/* Quantity Chart */}
                                    <PieChart>
                                        {/* Quantity Uploaded */}
                                        <Pie
                                            dataKey="value"
                                            startAngle={180}
                                            endAngle={0}
                                            data={quantityUploadedData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={75}
                                            outerRadius={105}
                                            fill="#575757"
                                            labelLine={false}
                                            label={renderCustomizedLabel}
                                        />
                                        {/* Quantity Sold and Unsold */}
                                        <Pie
                                            dataKey="value"
                                            startAngle={180}
                                            endAngle={0}
                                            data={soldUnsoldData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={110}
                                            outerRadius={120}
                                            fill="#575757"
                                            labelLine={false}
                                            label={renderCustomizedLabel}
                                            paddingAngle={soldUnsoldData[0].value !== 0 ? 5 : 0}
                                        >
                                            <Cell key={`cell-0`} fill="#357637" />
                                            <Cell key={`cell-1`} fill="#7a1a1a" />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className='analytics_summary'>
                                <p className='analytics_heading'>Summary: </p>
                                <h5 className='analytics_summaryContent'>
                                    Out of the 
                                    <span className='highlight uploaded'> total {allUploadedProducts.length} {allUploadedProducts.length !== 1 ? "artworks uploaded, " : "artwork uploaded, "}</span>
                                    you have 
                                    <span className='highlight soldd'> {soldProducts.length} {soldProducts.length !== 1 ? "artworks" : "artwork"} sold, </span>
                                    and you have                               
                                    <span className='highlight unsoldd'> {unsoldProducts.length} {unsoldProducts.length !== 1 ? "artworks" : "artwork"} unsold.</span>
                                </h5>
                            </div>
                        </div>
                    </div>
                )}
                {soldUnsoldPriceData.length !== 0 && priceUploadedData.length !== 0 && (
                    <div className='chart_priceCard'>
                        <h3 className='chart_priceHeading'>Revenue</h3>
                        <div className='analytics_row'>
                            <div className='chart_priceChart'>
                                <ResponsiveContainer width="100%" height="170%">
                                    {/* Quantity Chart */}
                                    <PieChart>
                                        {/* Quantity Uploaded */}
                                        <Pie
                                            dataKey="value"
                                            startAngle={180}
                                            endAngle={0}
                                            data={priceUploadedData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={75}
                                            outerRadius={105}
                                            fill="#575757"
                                            labelLine={false}
                                            label={renderCustomizedPriceLabel}
                                        />
                                        {/* Quantity Sold and Unsold */}
                                        <Pie
                                            dataKey="value"
                                            startAngle={180}
                                            endAngle={0}
                                            data={soldUnsoldPriceData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={110}
                                            outerRadius={120}
                                            fill="#575757"
                                            labelLine={false}
                                            label={renderCustomizedPriceLabel}
                                            paddingAngle={soldUnsoldPriceData[0].value !== 0 ? 5 : 0}
                                        >
                                            <Cell key={`cell-0`} fill="#357637" />
                                            <Cell key={`cell-1`} fill="#7a1a1a" />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className='analytics_summary'>
                                <p className='analytics_heading'>Summary: </p>
                                <h5 className='analytics_summaryContent'>
                                    Out of the 
                                    <span className='highlight uploaded'> total ${priceUploadedData[0].value} of potential revenue </span>
                                    from all your uploaded artworks, you have 
                                    <span className='highlight soldd'> gained ${soldUnsoldPriceData[0].value} from sold artworks, </span>
                                    and you have                               
                                    <span className='highlight unsoldd'> a potential ${soldUnsoldPriceData[1].value} to gain from unsold artworks.</span>
                                </h5>
                            </div>
                        </div>
                    </div>
                )}

                </>
            )}
        </div>
    )
}

export default PriceAnalytics