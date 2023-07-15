import React from "react"
import logo from '../tools/header/logo.svg'
import notfication from '../tools/header/notification.svg';
import logout from '../tools/header/logout.svg';
import './index.scss';


const Header = () => {
    return(
        <div className="header-">
            <div className="logo">
                <img className="logo_" src={logo}/>
            </div>
            <div className="search">
                {/* mamno3 lbawl */}
            </div>
            <div className="icons">
                <button>
                    <img className="icon" src={notfication}/>
                </button>
                <button>
                    <img className="icon" src={logout}/>
                </button>
            </div>
        </div>
    )
}


export default Header