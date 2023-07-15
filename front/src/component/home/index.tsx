import React from "react";
import "./index.scss"
import pongboy from "../tools/home/welcoming.png"
import play_icon from "../tools/home/play.png"
import table_img from "../tools/home/table.png"
import Button_ from "../button";
import line from '../tools/sign/line.png'
import test from "../tools/profile.png"
import topaz from "../tools/home/Topaz.png"
import background_img from "../tools/home/background.png"
import Modes from "../modes"
import Avatar from "../avatar";
import {motion} from "framer-motion"
import { useState, useEffect } from "react";
import axios from "axios"
const Home = () => {
    const TopPlayers = ()=> {
        return(
            <div className="player-bar">
             <div className="bar_cantainer">
                <h3 className="inf">1</h3>
                <div className="player-pc">
                    <Avatar src={test} wd_="3vw"/>
                </div>
                <h3 className="inf" >mmoutawa</h3>
                <h3 className="inf">2663 Xp</h3>
                <h3 className="inf">2.63</h3>
                <div className="elem">
                    <h3 className="inf">9</h3>
                    <img src={topaz}/>
                </div>
             </div>
            </div>
        )
    }

    return(
        <div className="home_">
            <div className="welcoming pos">
                <h3 className="title Welcom_title">WELCOME</h3>
                <h5 className="dsc">To The <br /> Ultimate<br /> Pong<br /> Experience!</h5>
                <button className="start_">
                    <Button_ option="Start"/>
                </button>
                <img className="boy" src={pongboy} />
            </div>
            <div className="stream pos">
                <h3 className="title title_stream">WATCH</h3>
                <h5 className="dsc-stream">The Game In Action</h5>
                    <button className="Watch_">
                        <Button_ option="Watch"/>
                    </button>
                <img className="table" src={table_img}/>
            </div>
            <div className="modes pos">
                    <Modes/>
            </div>
            <div className="players pos">
                <div className="titels_">
                    <h3 className=" inf">Rank</h3>
                    <h3 className="relative left-[13%] inf">Username</h3>
                    <h3 className="relative left-[8%] inf">Score</h3>
                    <h3 className="relative left-[3%] inf">Level</h3>
                    <h3 className="inf">Topaz</h3>
                </div>
                <TopPlayers/>
                <TopPlayers/>
                <TopPlayers/>
                <TopPlayers/>
                <TopPlayers/>
            </div>
        </div>
    )
}

export default Home;