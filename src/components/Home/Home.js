import React from 'react';
import './Home.css';
import { getInfo } from '../../api/index'
import Header from '../Header/Header'
import Food from '../goods/Food/Food'
import Comment from '../goods/Comment/Comment'
import Seller from '../goods/Seller/Seller'
import {Route, Switch, NavLink} from 'react-router-dom'
// import Time from "./../Time.js"
export default class Home extends React.Component {
    constructor(props){
        super(props)
        this.state={
            items:[{
                text: '商品',
                isActive: true,
                path: "/home/food"
              },
              {
                text: '评价',
                isActive: false,
                path: "/home/comment"
              }, {
                text: '商家',
                isActive: false,
                path: "/home/seller"
              }
            ],
            data:{
                seller:"",
                goods:"",
                ratings:""
            },
            shopcar:[]
           
        }
        
        if(this.props.history.location.pathname==="/home"){
            this.props.history.replace("/home/food")
        }
    }
    componentDidMount() {
    
        getInfo().then(res => {
            this.setState({
                data:res.data
            },()=>{
                let shopcar=[]
                let goods=this.state.data.goods
                for(let i=0;i<goods.length;i++){
                    shopcar.push([])
                    for (let j = 0; j < goods[i].foods.length; j++) {
                        shopcar[i].push({
                          name: goods[i].foods[j].name,
                          price: goods[i].foods[j].price,
                          num: 0
                        })
                    }
                }
                this.setState({
                    shopcar:shopcar
                })
            })
        })
    }
    // componentDidMount() {
        // setTimeout(()=>{
            
        // },2000)
    // }
    addItem=(index1,index2)=>{
        let shopcar=this.state.shopcar
        if(shopcar.length!==0){
            let num = shopcar[index1][index2].num;
            if (num < 10) {
                shopcar[index1][index2].num++;
            } else {
                alert("最多只能购买十份");
            }
            this.setState({
                shopcar:shopcar
            })
        }
    }
    clearShopCar=()=>{
        let shopcar=this.state.shopcar
        if(shopcar.length!==0){
            for(let i=0;i<shopcar.length;i++){
                for(let j=0;j<shopcar[i].length;j++){
                    shopcar[i][j].num=0
                }
            }
            this.setState({
                shopcar:shopcar
            })
        }
    }
    subItem=(index1,index2)=>{
        let shopcar=this.state.shopcar
        if(shopcar.length!==0){
            let num = shopcar[index1][index2].num;
            if (num > 0) {
                shopcar[index1][index2].num--;
            } else {
                shopcar[index1][index2].num = 0;
            }
            this.setState({
                shopcar:shopcar
            })
        }
    }
    render() {
        const linkList=this.state.items.map((item,index)=>{
            return(
                <NavLink key={index} to={{pathname:item.path,
                state:this.state.data}} activeStyle={{color:'red'}}>{item.text}</NavLink>
            )
        })

        let goods=this.state.data.goods?this.state.data.goods:[]
        let shopcar=this.state.shopcar.length!==0?this.state.shopcar:""
        let seller=this.state.data.seller?this.state.data.seller:[]
        let ratings=this.state.data.ratings?this.state.data.ratings:[]
        // console.log(seller)
        return (
            
            <div id="home">
                {/* <Time></Time> */}
                {/* <template v-if="flag"> */}
                    <Header seller={this.state.data.seller}></Header>
                    <div className="item-container">
                         {linkList}
                    </div>
                    <Switch>
                        {/* <Redirect from="/*" to="/home/food"></Redirect> */}
                        <Route path="/home/food" >
                            <Food goods={goods} shopcar={shopcar} addItem={this.addItem} subItem={this.subItem} clearShopCar={this.clearShopCar}/>
                        </Route>
                        <Route path="/home/comment" exact>
                            <Comment seller={seller} ratings={ratings}></Comment>
                        </Route>
                        <Route path="/home/seller" exact>
                            <Seller seller={seller}></Seller>
                        </Route>
                        
                    </Switch>
                {/* <keep-alive>
                    <router-view></router-view>
                </keep-alive> */}
                {/* </template> */}
            </div>
        )
    }
}
