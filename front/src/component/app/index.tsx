import React from "react";
import './index.scss'
import Header from "../header/index";
import Navbar from "../navbar/index";
import Home from "../home/index";
import Profile from "../profile/index";
import Status from "../status/index";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import Leaderboord from "../leaderboord";
function Container(){
    const location = useLocation();   
    return(
        <>
            <div className="background">
            <div className="allcontent">
                <div className="header_">
                    <Header/>
                </div>
                <div className="content_">
                    <div className="navbar">
                        <Navbar/>
                    </div>
                    <div className="page">
                        {location.pathname == "/Home" && <Home/>}
                        {location.pathname == "/Profile" && <Profile/>}
                        {location.pathname == "/Leaderboord" && <Leaderboord/>}
                    </div>
                    <div className="status">
                        <Status/>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Container;