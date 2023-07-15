import React from "react";
import { ReactSVG } from "react-svg";
import "./index.scss"
import Avatar from "../avatar/index";
import avatar_img from "../tools/profile.png"
import achv1_img from "../tools/achievement/1.png"
import achv2_img from "../tools/achievement/2.png"
import achv3_img from "../tools/achievement/3.png"
import achv4_img from "../tools/achievement/4.png"
import achv5_img from "../tools/achievement/5.png"
import Achievement from "./achievement";
import up_icon from "../tools/profile/up.svg"
import down_icon from "../tools/profile/down.svg"
import star_icon from "../tools/profile/star.svg"
import friends_icon from "../tools/profile/friends.svg"
import Friends from "./friends";
import Circularprog from "./Circularprog"
import Match from "./match";
type achiev_ = {
    img: string,
    opty: boolean,
}



const Profile = () => {

    const achve: { isAchieved: boolean; imagePath: string }[] = [
        { isAchieved: true, imagePath: achv1_img  },
        { isAchieved: false, imagePath: achv4_img },
        { isAchieved: false, imagePath: achv5_img },
        { isAchieved: true, imagePath: achv3_img },
        { isAchieved: true, imagePath: achv2_img },
        { isAchieved: false, imagePath: achv1_img },
        { isAchieved: false, imagePath: achv3_img },
    ];

    const Statisteque = ({svg, info, title}) => {
        return(
            <div className="profile-box">
                <div className="info-box">
                    <ReactSVG className="relative top-[-25%] w-[2vw]" src={svg}/>
                    <div className="h-[60%] flex flex-col relative bottom-[10%]">
                        <h4 className="text-[1vw] text-[#F1FAEE]">{title}</h4>
                        <h3 className="text-[1vw] text-[#F1FAEE]">{info}</h3>
                    </div>
                </div>
            </div>
         )
        }

    return(
        <div className="Profile">
            <div className="half-container">
                <h3 className="text-[1vw] text-[#A8DADC] usr">MMOUTAWA</h3>
                <div className="child-container">
                    <div className="w-[30%] h-[100%] flex items-center justify-end">
                        <Statisteque svg={up_icon} info={"5"} title={"Wins"}/>
                        <Statisteque svg={down_icon} info={"2"} title={"Losses"}/>
                    </div>
                    <div className="flex h-[100%] w-[20%] items-center justify-center">
                        <Avatar src={avatar_img} wd_="10vw"/>
                    </div>
                    <div className="w-[30%] h-[100%] flex items-center justify-start">
                        <Statisteque svg={friends_icon} info={"20"} title={"Friends"}/>
                        <Statisteque svg={star_icon} info={1} title={"Rank"}/>
                    </div>
                </div>
                <div className="lv-profile">
                    <h4 className="text-[#A8DADC]">Lv 2.63</h4>
                    <div className="w-[80%] h-[23%] sp-lv">
                        <div className="w-[60%] h-[100%] main-lv"></div>
                    </div>
                    <h4 className="text-[#A8DADC]">2630 Xp</h4>
                </div>
                <div className="achievement">
                    {
                        achve.map((arr, key) =>   
                        <Achievement imagePath={arr.imagePath} isAchieved={arr.isAchieved}/>)
                    }
                </div>
            </div>
            <div className="w-[100%] h-[50%] flex p-right-[1%]">
                <div className="h-[100%] w-[50%] flex items-center flex-col">
                    <h4 className="text-[#A8DADC]">Friends</h4>
                    <div className="h-[95%] w-[100%] Friend">
                    {
                        achve.map((arr, key) =>   
                        <Friends/>)
                    }
                    </div>
                </div>
                <div className="h-[100%] w-[50%] stateq">
                    <div className="w-[65%] h-[100%] circle">
                        <Circularprog size={"21vw"} pct={50}/>

                    </div>
                    <div className="w-[35%] h-[100%] pt-[1%] pr-[3%] matchs">
                    {
                        achve.map((arr, key) =>   
                        <Match isWin={arr.isAchieved}/>)
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;