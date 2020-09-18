import React from 'react';
import './Food.css';
import BScroll from 'better-scroll'
import ShopCar from '../../ShopCar/ShopCar'
var listHeight=[]
var food_scroll=""
const body = React.createRef()
const menuWrapper = React.createRef()
const foodsWrapper = React.createRef()
const detailRef=React.createRef()
export default class Food extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scrollY:0,
            foodShow:false,
            detail:{},
            ratings:[],
            ratingType:"",
            onlyRating:false
        }
    }
    selectOnlyRating=()=> {
        let ratings=this.state.ratings
        this.setState({
            onlyRating:!this.state.onlyRating
        },()=>{
            for (let i = 0; i < ratings.length; i++) {
                if (this.state.onlyRating) {
                    if (ratings[i].text !== "") {
                        ratings[i].contentShow = true
                    } else {
                        ratings[i].contentShow = false
                    }
                } else {
                    ratings[i].contentShow = true
                }
            }
            this.setState({
                ratings:ratings
            })
        })
        
    }
    selectRatingType=(e)=>{
        let name = e.target.dataset.name
        let ratings=this.state.ratings
        for (let i = 0; i < ratings.length; i++) {
            if (name === "all") {
                ratings[i].typeShow = true
            } else if (name === "agree") {
                if (ratings[i].rateType === 0) {
                    ratings[i].typeShow = true
                } else {
                    ratings[i].typeShow = false
                }
            } else if (name === "disagree") {
                if (ratings[i].rateType === 1) {
                    ratings[i].typeShow = true
                } else {
                    ratings[i].typeShow = false
                }
            }
        }
        this.setState({
            ratings:ratings
        })
        
    }
    showFood=(index1,index2)=>{
        let tempRatings = []
        let ratingType = {
            all: this.props.goods[index1].foods[index2].ratings.length,
            agree: 0,
            disagree: 0
        }
        this.setState({
            foodShow:true
        })
        for (let i = 0; i < this.props.goods[index1].foods[index2].ratings.length; i++) {
            tempRatings.push({
                contentShow: true,
                typeShow:true,
                ...this.props.goods[index1].foods[index2].ratings[i]
            })
            if (this.props.goods[index1].foods[index2].ratings[i].ratingType === 0) {
                ratingType.agree += 1
            } else {
                ratingType.disagree += 1
            }
        }
        this.setState({
            ratings:tempRatings,
            ratingType:ratingType,
            detail:{
                name: this.props.goods[index1].foods[index2].name,
                sellCount: this.props.goods[index1].foods[index2].sellCount,
                rating: this.props.goods[index1].foods[index2].rating,
                path: this.props.goods[index1].foods[index2].image,
                info: this.props.goods[index1].foods[index2].info,
                price: this.props.goods[index1].foods[index2].price,
                index: [index1, index2]
            }
        })
        new BScroll(detailRef.current,{
            click:true,
            bounce:false
        })
        
    }
    selectItem = (index) => {
        let top=document.getElementsByClassName("lists")[index].offsetTop
        food_scroll.scrollTo(0,-top,500)
    }
    InitScroll=()=>{
        food_scroll=new BScroll(foodsWrapper.current,{
            click:true,
            probeType:3,
            bounce:false
        })
        new BScroll(menuWrapper.current,{
            click:true
        })
        food_scroll.on("scroll",pos=>{
            this.setState({
                scrollY:Math.abs(pos.y)
            })
        })
        
    }
    componentDidUpdate(){
        let list=[]
        let lists=document.getElementsByClassName("lists")
        for(let i=0;i<lists.length;i++){
            list.push(lists[i].offsetTop)
        }
        listHeight=list
    }
    componentDidMount() {
        this.InitScroll()
    }
    closeDetailFood=()=>{
        this.setState({
            foodShow:false
        })
    }
    addFood=(index)=>{
        // console.log(index)
        this.props.addItem(index[0],index[1])
    }
    dataFormat=timestamp=>{
        let date = new Date(timestamp)
        let year = date.getFullYear()
        let month= date.getMonth() + 1;
        let day = date.getDate();

        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();

        if (month < 10) {
            month = "0" + month
        }
        if (day < 10) {
            day = "0" + day
        }
        return "" + year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
    }
    getPos=()=> {
        // console.log(this.state.listHeight)
        for(let i=0;i<listHeight.length;i++){
            if(this.state.scrollY<listHeight[i]){
                return i-1
            }
        }
        return listHeight.length-1
    }
    render() {
        const goods = this.props.goods
        const detail=this.state.detail
        const shopcar=this.props.shopcar.length!==0?this.props.shopcar:[]
        const menuList = goods.map((good, index) => {
            return (
                <li key={index} className={'menu-list'} onClick={() => this.selectItem(index)} style={{fontWeight:this.getPos()===index?'bold':'',background:this.getPos()===index?'white':''}}>
                    <span className="text">
                        {good.type >= 1 ? <img alt="img" src={require("../../../icon/special_3@3x.png")} /> : ''}
                        {good.name}
                    </span>
                </li>)
        })
        const foodList = goods.map((good, good_index) => {
            return (
                <div className="lists" key={good.name}>
                    <div className="foot-class">{good.name}</div>
                    {good.foods.map((food, food_index) => {
                        return (
                            <li className="food-list" key={good.name + food.name}>
                                <div className="food-img" onClick={()=>this.showFood(good_index,food_index)}>
                                    <img alt="food" src={food.image} />
                                </div>
                                <div className="food-info">
                                    <div className="food-name">{food.name}</div>
                                    {food.description!==''?<div className="food-description" >{food.description}</div>:''}
                                    <div className="food-rate">
                                        <span>月售{ food.sellCount }份</span>
                                        <span>好评率{ food.rating }%</span>
                                    </div>
                                    <div className="food-price">
                                        <div className="price">￥{food.price}</div>
                                        <div className="number" >
                                            <div className="symbol-add" onClick={()=>this.props.subItem(good_index,food_index)}>-</div>
                                            <div className="number-text" >{ this.props.shopcar.length!==0?this.props.shopcar[good_index][food_index].num:0}</div>
                                            <div className="symbol-sub" onClick={()=>this.props.addItem(good_index,food_index)}>+</div>
                                        </div>
                                    </div>
                                </div>
                           </li>
                        )
                    })}
                </div>
            )
        })
        
return (
    <div id="food">
        <div className="body" ref={body}>
            <div className="nav-list-wrapper" ref={menuWrapper}>
                <ul>
                    {menuList}
                </ul>
            </div>

            <div className="food-list-wrapper" ref={foodsWrapper}>
                <ul>
                    {foodList}
                </ul>
            </div>
        </div>
        <div className="foot">
            <ShopCar shopcar={shopcar} addItem={this.props.addItem} subItem={this.props.subItem} clearShopCar={this.props.clearShopCar}></ShopCar>
        </div>


        <div className={this.state.foodShow?'detail-food-contaienr scale-in':'detail-food-contaienr scale-out'} ref={detailRef}>

                <div>
                    <div className="close-btn" onClick={this.closeDetailFood} style={{transform:'scale(2) rotate(45deg)'}}>+</div>
                    <div className="food-image-l">
                        <img alt="" src={detail.path} />
                    </div>
                    <div className="detail-food-info">
                        <div className="el-info">
                            <h1>{detail.name}</h1>
                            <div style={{marginBottom:18,height:10,lineHeight:'10px'}}>
                                <span>月售{detail.sellCount}份</span>
                                <span style={{marginLeft:15}}>好评率{detail.rating}%</span>
                            </div>
                        </div>
                        <div className="el-price-info">
                            <span style={{color:'red',fontSize:14,display:'block'}}>￥{detail.price}</span>

                            {shopcar.length!==0&&detail.index?(shopcar[detail.index[0]][detail.index[1]].num===0?<button style={{position:'absolute',right:18}} onClick={()=>this.addFood(detail.index)}>加入购物车</button>:<span></span>):<span></span>}

                            <div className="detail-operation">
                                <div className="symbol-add" onClick={()=>this.props.subItem(detail.index[0],detail.index[1])}>-</div>
                                <div className="el-font-size" style={{lineHeight:'20px',margin:'0 10px',width:14}}>
                                        {(shopcar.length!==0&&detail.index)?shopcar[detail.index[0]][detail.index[1]].num:0}
                                </div>
                                <div className="symbol-sub" onClick={()=>this.props.addItem(detail.index[0],detail.index[1])}>+</div>
                            </div>

                        </div>
                        
                    </div>

                    <div className="detail-food-introduction">
                        <h1>商品介绍</h1>
                        <div className="food-introduction">{detail.info}</div>
                    </div>
                    <div className="detail-food-rating">
                        <h1>商品评价</h1>
                        <div className="rating-select-container">
                            <div className="rating-select white-font" style={{background:'#00a0dc'}}
                                data-name="all" onClick={this.selectRatingType}>全部{this.state.ratingType?this.state.ratingType.all:0}</div>
                            <div className="rating-select black-font" style={{background:'rgba(0,160,220,0.2)'}}
                                 data-name="agree" onClick={this.selectRatingType}>推荐{this.state.ratingType?this.state.ratingType.agree:0}</div>
                            <div className="rating-select black-font" style={{background:'rgba(77,85,93,0.2)'}}
                                 data-name="disagree" onClick={this.selectRatingType}>吐槽{this.state.ratingType?this.state.ratingType.disagree:0}</div>
                        </div>
                        <div className="rating-select-btn el-font-size">
                            {this.state.onlyRating?<img alt="" src={require("../../../icon/onClick.png")} onClick={this.selectOnlyRating}/>:
                            <img alt="" src={require("../../../icon/unonClick.png")} onClick={this.selectOnlyRating}/> }
                            只看有内容的评价
                        </div>
                    </div>
                    <div className="rating-wapper el-font-size">
                        <ul>
                            {this.state.ratings.map((rating,index)=>{
                                return(
                                    <li className="rating-list" key={index} style={{display:(rating.contentShow&&rating.typeShow?"":"none")}}>
                                        <div className="rating-title">
                                            <div className="rating-date">{this.dataFormat(rating.rateTime)}</div>
                                            <div className="rating-user">
                                                {rating.username}
                                                <span style={{background:'url('+rating.avatar+')',backgroundSize:'12px 12px'}}></span>
                                            </div>
                                        </div>
                                        <div className="rating-content black-font">                        
                                            {rating.rateType===0?<img alt="" src={require('../../../icon/agree.png')}/>:<img alt="" src={require('../../../icon/disagree.png')}/>}
                                        {rating.text}
                                    </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
    </div>
)
        
    }
}
