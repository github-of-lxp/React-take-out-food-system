import React, { useState, useEffect } from 'react'

export default function Time(){
    const [time,setTime]=useState(new Date().toLocaleTimeString())
    useEffect(()=>{
        setInterval(()=>{
            setTime(new Date().toLocaleTimeString())
        },1000)
    },[])
    return <div>{time}</div>
}