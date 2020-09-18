import React from 'react';
import './PreviewImage.css' 
const scalaImage=React.createRef()
export default class PreviewImage extends React.Component{
    
    componentDidUpdate(){
        if(this.props.show){
            let item=scalaImage.current
            item.style.opacity="1";
            item.style.zIndex="999";
            item.style.transform="scale(1)"
        }
    }
    componentDidMount(){
       
        let item=scalaImage.current
        item.ontouchstart=(e)=>{
            item.style.transition="none"
            document.body.style.overflow="hidden"
            e.stopPropagation();
            let startX=e.changedTouches[0].clientX
            let startY=e.changedTouches[0].clientY
            item.ontouchmove=(e)=>{
                let clientY=e.changedTouches[0].clientY
                let clientX=e.changedTouches[0].clientX
                item.style.transform="scale("+(1-(clientY-startY)/500)+")"
                item.style.top=(clientY-startY)*0.5+"px";
                item.style.left=(clientX-startX)*0.5+"px"
                item.ontouchend=(e)=>{
                    item.style.transition=".5s ease all"
                    let endY=e.changedTouches[0].clientY
                    if(endY-startY>200){
                        item.style.opacity="0";
                        item.style.zIndex="-10";
                        this.props.hide()
                        setTimeout(()=>{
                            item.style.transform="scale(0)"
                        },550)
                    }else{
                        item.style.transform="scale(1)"
                    }
                    item.style.top=0
                    item.style.left=0
                    document.body.style.overflow="scroll"
                }
            }
        }
    }
    shouldComponentUpdate(nextProps){
        return this.props.imageSrc!==nextProps.imageSrc||this.props.show!==nextProps.show
    }
    render(){
        return(
            <div className="scalaImage" ref={scalaImage}>
                <img alt="" src={this.props.imageSrc} />
            </div>
        )
    }
}