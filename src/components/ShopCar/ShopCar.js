import React from 'react';
import './ShopCar.css';
import BScroll from 'better-scroll'
const shopcarlist = React.createRef()
export default class ShopCar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shopcar_Toggle:false
        }
    }
    totalNum = () => {
        let totalnum = 0;
        for (let i = 0; i < this.props.shopcar.length; i++) {
            for (let j = 0; j < this.props.shopcar[i].length; j++) {
                totalnum += this.props.shopcar[i][j].num;
            }
        }
        return totalnum;
    }
    totalPrice = () => {
        let totalprice = 0;
        for (let i = 0; i < this.props.shopcar.length; i++) {
            for (let j = 0; j < this.props.shopcar[i].length; j++) {
                totalprice += this.props.shopcar[i][j].price * this.props.shopcar[i][j].num;
            }
        }

        return totalprice;
    }
    shopcarToggle=()=>{
        if(this.totalNum()>0){
            this.setState({
                shopcar_Toggle:!this.state.shopcar_Toggle
            })
        }
    }
    clearShopCar=()=>{
        this.shopcarToggle()
        this.props.clearShopCar()
    }
    componentDidMount(){
        new BScroll(shopcarlist.current,{
            click:true
        })
    }
    pay=()=>{
        let price=this.totalPrice()
        if(price>20){
            alert("支付"+(price+4)+"元")
        }
    }
    render() {
        const totalPriceItem = this.totalPrice() === 0 ? <div className="append append-unenough">￥20元起送</div> :
            (this.totalPrice() > 0 && this.totalPrice() < 20 ? <div className="append append-unenough">还差￥{20 - this.totalPrice()}元起送</div> :
                <div className="append append-enough" onClick={this.pay}>去结算</div>
            )

        const shopcar = this.props.shopcar.length !== 0 ? this.props.shopcar : []
        const shopcarList = shopcar.map((good, good_index) => {
            return(
                good.map((food, food_index) => {
                    return (
                        food.num > 0 ? <li key={good_index + food.name}>
                            <span>{food.name}</span>
                            <span>
                                <div className="price" style={{ color: 'red', fontSize: 14, marginRight: 15 }}>￥{food.num * food.price}元</div>
                                <div className="control">
                                    <div className="control-icon" onClick={()=>this.props.subItem(good_index,food_index)}>-</div>
                                    <div style={{ color: '#999999', fontSize: 14, margin: '0 10px' }}>{food.num}</div>
                                    <div className="control-icon" onClick={()=>this.props.addItem(good_index,food_index)}>+</div>
                                </div>
                            </span>
                        </li> : ""
                    )
                })
            )
        })
        return (
            <div className="shopcar">
                <div className="shopcar-list-container">
                   
                    {this.state.shopcar_Toggle?<div className='mask mask-enter-active' onClick={this.shopcarToggle}></div>:''}
                   
                    <div className="car-list" style={{bottom:(this.state.shopcar_Toggle?46:-261)}}> 
                        <div className="list-header">
                            <span>购物车</span>
                            <span onClick={this.clearShopCar}>清空</span>
                        </div>
                        <div className="list-body" ref={shopcarlist}>
                            <ul>
                                {shopcarList}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="icon" >
                    {this.totalNum() > 0 ? <div className="total-num">{this.totalNum()}</div> : ''}
                    <div className="container" style={{ background: (this.totalPrice() > 0 ? '#007fff' : '') }} onClick={this.shopcarToggle}>
                        <img alt="img" src={require('../../icon/shopcar.png')} />
                    </div>
                </div>
                
                <div className="totalprice" style={{ color: (this.totalPrice() > 0 ? 'white' : '') }}>￥{this.totalPrice()}</div>
                <div className="msg">另需配送费￥4元</div>
                {totalPriceItem}
            </div>
        )
    }
}