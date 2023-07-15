import React from "react"
import achievement from "../tools/profil_eff/arch.png"
import Avatar from "../avatar/index"
import avatar_img from "../tools/sign/avatar.png"
import racket_img from "../tools/profil_eff/mini_racket.png"
import down_img from "../tools/profil_eff/down.png"
import up_img from "../tools/profil_eff/up.png"
import "./index.scss"


const Profile_effect = () => {

    return(
        <>
            <div className="avatar-arch ">
                <div className="avatar-img-effect">
                    <Avatar src={avatar_img} wd_="3vw"/>
                </div>
                <div className="achievement-">
                    <img className="h-[1.8vw] arch" src={achievement}/>
                    <img className="h-[1.8vw] arch" src={achievement}/>
                    <img className="h-[1.8vw] arch" src={achievement}/>
                </div>
            </div>
                <h3 className="relative top-[5%] text-[0.7vw] text-[#1D3557]">mmoutawa</h3>
            <div className="statistical">
                <div className="box-st">
                    <div className="img-pos">
                        <img className="box-img" src={racket_img}/>
                    </div>
                    <h2 className=" text-[#F1FAEE]">GAMES</h2>
                    <h2 className=" text-[#F1FAEE]">7</h2>
                </div>
                <div className="box-st">
                    <div className="img-pos">
                        <img className="box-img" src={down_img}/>
                    </div>
                    <h2 className=" text-[#F1FAEE]">WINS</h2>
                    <h2 className=" text-[#F1FAEE]">5</h2>
                </div>
                <div className="box-st">
                    <div className="img-pos">
                        <img className="box-img" src={up_img}/>
                    </div>
                    <h2 className=" text-[#F1FAEE]">LOSSES</h2>
                    <h2 className=" text-[#F1FAEE]">2</h2>
                </div>
            </div>
            <div className="level-effect">
                <div className="sm-info">
                    <h2 className=" text-[#F1FAEE]">Lv 2.63</h2>
                    <h2 className=" text-[#F1FAEE]">2630xp</h2>
                </div>
                <div className="sm-level">
                    <div className="cr-level"></div>
                </div>
            </div>
        </>
    )
}

export default Profile_effect