import React from 'react';
import './Comment.css';
import BScroll from 'better-scroll'
import { withRouter } from 'react-router-dom'
const comment = React.createRef()

class Comment extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            ratingType: {},
            ratings:props.ratings?props.ratings:[],
            onlyRating:false,
            isRender:props.seller&&props.ratings.length>0
        }
    }
    componentDidMount() {
       
        if(this.state.isRender){
            let ratingType = {
                all: this.props.ratings.length,
                agree: this.props.ratings.filter(rating=>rating.rateType===0).length,
                disagree: this.props.ratings.filter(rating=>rating.rateType===1).length,
            }
            this.setState({
                ratingType: ratingType
            })
            new BScroll(comment.current,{
                click:true,
                bounce:false
            })
        }else{
            this.props.history.replace("/home/food")
        }
        
    }
    selectComment=(e)=>{
        let name=e.currentTarget.dataset.name
        // console.log(this.props.ratings)
        if(name==="all"){
            this.setState({
                ratings:this.props.ratings
            })
        }else if(name==="agree"){
            this.setState({
                ratings:this.props.ratings.filter(rate=>rate.rateType===0)
            })
        }else if(name==="disagree"){
            this.setState({
                ratings:this.props.ratings.filter(rate=>rate.rateType===1)
            })
        }
    }
    onlyRating=()=>{
        this.setState({
            onlyRating:!this.state.onlyRating
        },()=>{ 
            this.setState({
                ratings:this.state.onlyRating?this.state.ratings.filter(item=>item.text):this.props.ratings
            })
        })
    }
    dateFormat = timestamp => {
        let date = new Date(timestamp)
        let year = date.getFullYear()
        let month = date.getMonth() + 1;
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
    InitArray = (length) => {
        let arr = []
        for (let i = 0; i < length; i++) {
            arr.push(0)
        }
        return arr
    }
    render() {
        const seller = this.props.seller.length !== 0 ? this.props.seller : []
        // const ratings = this.props.ratings.length !== 0 ? this.props.ratings : []
        // console.log(seller)
        // console.log(this.state.ratings)
        return (
            this.state.isRender?<div id="comment" ref={comment}>
                <div className="comment-wrapper">
                    <div className="comment-head">
                        <div className="left-rating">
                            <div className="rating-font-color" style={{ fontSize: '24px' }}>{seller.score}</div>
                            <div className="el-font-size" style={{ marginBottom: '8px' }}>综合评分</div>
                            <div className="el-font-size grey-font-color">高于周边商家{seller.rankRate}%</div>
                        </div>
                        <div className="right-rating">
                            <div className="rank-rating">
                                <span className="el-font-size">服务态度</span>
                                <span className="rating-star-wrapper">
                                    {this.InitArray((Math.floor(seller.serviceScore))).map((i, index) => {
                                        return <img alt="" key={index} src={require("../../../icon/star.png")} />
                                    })}
                                    {this.InitArray((5 - Math.floor(seller.serviceScore))).map((i, index) => {
                                        return <img alt="" key={index} src={require("../../../icon/star_grey.png")} />
                                    })}

                                </span>
                                <span className="el-font-size rating-font-color">{seller.serviceScore}</span>
                            </div>
                            <div className="rank-rating">
                                <span className="el-font-size">商品评分</span>
                                <span className="rating-star-wrapper">
                                    {this.InitArray((Math.floor(seller.foodScore))).map((i, index) => {
                                        return <img alt="" key={index} src={require("../../../icon/star.png")} />
                                    })}
                                    {this.InitArray((5 - Math.floor(seller.foodScore))).map((i, index) => {
                                        return <img alt="" key={index} src={require("../../../icon/star_grey.png")} />
                                    })}

                                </span>
                                <span className="el-font-size rating-font-color">{seller.foodScore}</span>
                            </div>
                            <div className="rank-rating">
                                <span className="el-font-size">送达时间</span>
                                <span className="el-font-size grey-font-color">{seller.deliveryTime}分钟</span>
                            </div>
                        </div>
                    </div>

                    <div className="split"></div>

                    <div className="detail-food-rating">
                        <div className="rating-select-container">
                            <div className="rating-select" style={{ background: '#00a0dc', color: 'white' }} data-name="all" onClick={this.selectComment}>
                                全部{this.state.ratingType.all}</div>
                            <div className="rating-select black-font" style={{ background: 'rgba(0,160,220,0.2)' }} data-name="agree" onClick={this.selectComment}
                            >满意{this.state.ratingType.agree}</div>
                            <div className="rating-select black-font" style={{ background: 'rgba(77,85,93,0.2)' }} data-name="disagree" onClick={this.selectComment}
                            >不满意{this.state.ratingType.disagree}</div>
                        </div>
                        <div className="rating-select-btn el-font-size" onClick={this.onlyRating}>
                            {this.state.onlyRating? <img  src={require('../../../icon/onClick.png')} alt=""/>:<img  src={require("../../../icon/unonClick.png")} alt=""/>}
                            只看有内容的评价
                        </div>
                    </div>

                    <div className="user-rating-container">
                        <ul>
                            {this.state.ratings.map((rating, index) => {
                                return (
                                    <li className="user-rating-list" key={index}>
                                        <div className="user-avatar">
                                            <img alt="" src={rating.avatar} />
                                        </div>
                                        <div className="user-rating-info">
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                <span className="el-font-size">{rating.username}</span>
                                                <span className="el-font-size grey-font-color">{this.dateFormat(rating.rateTime)}</span>
                                            </div>
                                            <div className="user-rating-score">
                                                <span>
                                                    {this.InitArray((Math.floor(rating.score))).map((i, index) => {
                                                        return <img alt="" key={index} src={require("../../../icon/star.png")} style={{ width: 10, height: 10 }} />
                                                    })}
                                                    {this.InitArray((5 - Math.floor(rating.score))).map((i, index) => {
                                                        return <img alt="" key={index} src={require("../../../icon/star_grey.png")} style={{ width: 10, height: 10 }} />
                                                    })}
                                                </span>
                                                <span className="el-font-size grey-font-color" style={{ marginLeft: 5 }}
                                                >{rating.deliveryTime}分钟送达</span>
                                            </div>
                                            <div className="user-rating-content el-font-size">{rating.text}</div>
                                            <div className="user-rating-recommend">
                                                <span className="agree-icon">
                                                    <img src={require("../../../icon/agree.png")} alt=""/>
                                                </span>
                                                {rating.recommend.map((recommend, index) => {
                                                    return <span className="recommend-list el-font-size grey-font-color" key={index}>{recommend}</span>
                                                })}

                                                <span></span>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}

                        </ul>
                    </div>
                </div>
            </div>:''
        )
    }
}
export default withRouter(Comment)