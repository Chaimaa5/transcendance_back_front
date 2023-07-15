import React from "react";
import Avatar from "../avatar/index";
import Button_ from "../button/index";
import avatar_img from "../tools/profile.png"

const Friends = () => {
    return(
        <div className="flex h-[3vw] w-[100%] m-[2%] rounded-[2vw] friends-bar">
            <div className="h-[100%] w-[10%] av-bar">
                <Avatar src={avatar_img} wd_="2.5vw"/>
            </div>
            <h3 className="text-[0.8vw] text-[#A8DADC]">hkhalil</h3>
            <h3 className="text-[0.8vw] text-[#A8DADC]">2630 xp</h3>
            <h3 className="text-[0.8vw] text-[#A8DADC]">Lv 2.63</h3>
            <div className=" h-[90%]">
                <Button_ option="Invite"/>
            </div>
        </div>
    )
}

export default Friends