import React from "react";
import "./index.scss"
import avatar_img from "../tools/sign/avatar.png"
import Avatar from "../avatar/index";





const Status = () => {
    const OfforOn = (st) => {
        let color = "#E63946";
        if(st == "true") color = "#29F125";
        return(
            <div className="cursor-pointer m-[5%] relative st-container">
                <div style={{background :color}} className="status-cr"></div>
                <Avatar src={avatar_img} wd_="3.2vw" />
            </div>
        )
    }
    return(
        <div className="container-status">
            <div className="status-">
                <OfforOn st="true"/>
                <OfforOn st=""/>
                <OfforOn st=""/>
                <OfforOn st=""/>
                <OfforOn st=""/>
            </div>
            
        </div>
    )
}

export default Status;