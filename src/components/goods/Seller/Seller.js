import React, { useState, useEffect ,useRef} from 'react';
import './Seller.css';
import BScroll from 'better-scroll'
import PreviewImage from '../../PreviewImage/PreviewImage'
import { useHistory } from 'react-router';

function areEqual(prevProps, nextProps) {
    return prevProps.seller.name===nextProps.seller.name
}
function Seller(props){
    let [scalaImgSrc,setScalaImgSrc]=useState("")
    let [showScalaImage,setShowScalaImage]=useState(false)
    let [store,setStore]=useState(false)
    const seller=useRef()
    const image=useRef()

    const route=useHistory()
    useEffect(()=>{
        if(props.seller.length===0){
            route.replace("/home/food")
        }else{
            new BScroll(seller.current,{
                click:true,
                scrollY:true
            })
            new BScroll(image.current,{
                click:true,
                scrollY:false,
                scrollX:true
            })   
        }
        
        
    },[props.seller])
    const selectImage=(src)=>{
        setScalaImgSrc(src)
        setShowScalaImage(true)
    }
    const getSupportType=(type)=>{
        switch(type){
            case 0:
              return <img alt="" src={require("../../../icon/decrease_3@3x.png")} />
            case 1:
              return <img alt="" src={require("../../../icon/discount_2@3x.png")} />
            case 2:
              return <img alt="" src={require("../../../icon/guarantee_3@3x.png")} />
            case 3:
              return <img alt="" src={require("../../../icon/invoice_3@3x.png")} />
            case 4:
              return <img alt="" src={require("../../../icon/special_3@3x.png")} />
            default:
              return ""
         }  
    }
    return (
        props.seller.length===0?'':
        <div id="seller" ref={seller}>
            <div className="seller-wrapper" id="seller-wrapper">
            <div className="seller-top">
                <div style={{borderBottom:'1px solid #dddddd'}}>
                <div className="seller-name">{props.seller.name}</div>
                <div className="seller-rating">
                    <div>
                    {new Array(Math.floor(props.seller.score)).fill(0).map((item,index)=>{
                        return <img alt="" src={require('../../../icon/star.png')} style={{width:'15px',height:'15px'}} key={index+10}></img>
                    })}
                    {new Array(5-Math.floor(props.seller.score)).fill(0).map((item,index)=>{
                        return <img alt="" src={require('../../../icon/star_grey.png')} style={{width:'15px',height:'15px'}} key={index+10}></img>
                    })}
                    </div>
                    <span className="el-font-size grey-font-color">({props.seller.ratingCount})</span>
                    <span className="el-font-size grey-font-color">月售{props.seller.sellCount}单</span>
                </div>
                
                    <div className="seller-store">
                        <div className="heart">
                            {store?<img alt="" onClick={()=>setStore(false)} src={require("../../../icon/redHeart.png")}/>:<img alt="" onClick={()=>setStore(true)} src={require("../../../icon/greyHeart.png")}/>}
                        </div>
                        {store? <div className="el-font-size grey-font-color">已收藏</div>:<div className="el-font-size grey-font-color">收藏</div>}
                    </div>
               
                
                </div>
                <div className="info-item-list">
                <div className="info-item">
                    <div className="el-font-size grey-font-color info-title">起送价</div>
                    <div className="el-font-size"><span className="el-large-font-size">{props.seller.minPrice}</span>元</div>
                </div>
                <div className="info-item">
                    <div className="el-font-size grey-font-color info-title">商家配送</div>
                    <div className="el-font-size"><span className="el-large-font-size">{props.seller.deliveryPrice}</span>元</div>
                </div>
                <div className="info-item">
                    <div className="el-font-size grey-font-color info-title">平均配送时间</div>
                    <div className="el-font-size"><span className="el-large-font-size">{props.seller.deliveryTime}</span>分钟</div>
                </div>
                </div>
            </div>
            <div className="split"></div>
            <div className="seller-middle" style={{paddingBottom: 0}}>
                <div className="seller-name">公告与活动</div>
                <div className="seller-info el-font-size">{props.seller.bulletin}</div>
                <div className="seller-coupon-container">
                <ul>
                    {props.seller.supports.map((support,index)=>{
                        return (<li className="seller-coupon-list el-font-size" key={index}>
                            <span>
                                {getSupportType(support.type)}
                            </span>
                        <span>{support.description}</span>
                     </li>)
                    })}
                </ul>
                </div>
            </div>
            <div className="split"></div>
            <div className="seller-bottom">
                <div className="seller-name">商家实景</div>
                <div className="seller-image" ref={image}>
                    <ul>
                        {props.seller.pics.map(pic=>{
                            return <li className="seller-image-list" key={pic}><img alt="" src={pic} onClick={()=>selectImage(pic)}/></li>
                        })}
                    </ul>
                </div>
            </div>
            <div className="split"></div>
            <div className="seller-bottom-info" style={{paddingBottom:0}}>
                <div className="seller-name">商家信息</div>
                <ul>
                    {props.seller.infos.map(info=><li className="el-font-size" key={info}>{info}</li>)}
                </ul>
            </div>
            </div>
            <PreviewImage imageSrc={scalaImgSrc} show={showScalaImage} hide={()=>setShowScalaImage(false)}></PreviewImage>
        </div>
    )
}
export default React.memo(Seller,areEqual)


