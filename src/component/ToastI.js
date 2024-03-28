import React from "react";
import {ToastAndroid} from "react-native";
import {All_text} from "../assets/All_text/All_text";





const ToastI=(props:any)=>{
    // console.log('props',props)
  return ToastAndroid.showWithGravity(
        props.text,
        ToastAndroid.LONG,
        ToastAndroid.CENTER
    )
}

export {ToastI}
