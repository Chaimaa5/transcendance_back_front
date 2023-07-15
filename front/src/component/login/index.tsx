import React from "react";
import { useEffect } from "react";
import './index.scss'
import { Application, SPEObject } from '@splinetool/runtime';
// import anime from 'animejs';
import { useRef } from "react";
import bg from '../tools/sign/background.png'
import { useNavigate } from 'react-router-dom';

const Spline = React.lazy(() => import('@splinetool/react-spline'));

type btn_obj = {
  title:string,
}

const Signbottun = ({title}:btn_obj) => {
  return(
    <div className="sign-btn">
        <div className="-btn">
          <svg className="login-icon" viewBox="0 0 28 31" fill="#A8DADC" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.36684 1.36683C2.24201 0.491665 3.42899 0 4.66667 0H14C15.2377 0 16.4247 0.491665 17.2998 1.36683C18.175 2.242 18.6667 3.42899 18.6667 4.66667V10.5C18.6667 11.1443 18.1443 11.6667 17.5 11.6667C16.8557 11.6667 16.3333 11.1443 16.3333 10.5V4.66667C16.3333 4.04783 16.0875 3.45434 15.6499 3.01675C15.2123 2.57917 14.6188 2.33333 14 2.33333H4.66667C4.04783 2.33333 3.45434 2.57917 3.01675 3.01675C2.57917 3.45434 2.33333 4.04783 2.33333 4.66667V25.6667C2.33333 26.2855 2.57917 26.879 3.01675 27.3166C3.45434 27.7542 4.04783 28 4.66667 28H14C14.6188 28 15.2123 27.7542 15.6499 27.3166C16.0875 26.879 16.3333 26.2855 16.3333 25.6667V19.8333C16.3333 19.189 16.8557 18.6667 17.5 18.6667C18.1443 18.6667 18.6667 19.189 18.6667 19.8333V25.6667C18.6667 26.9043 18.175 28.0913 17.2998 28.9665C16.4247 29.8417 15.2377 30.3333 14 30.3333H4.66667C3.42899 30.3333 2.242 29.8417 1.36684 28.9665C0.491666 28.0913 0 26.9043 0 25.6667V4.66667C0 3.42899 0.491666 2.242 1.36684 1.36683ZM12.4916 9.67504C12.9472 10.1307 12.9472 10.8693 12.4916 11.325L9.81658 14H26.8333C27.4777 14 28 14.5223 28 15.1667C28 15.811 27.4777 16.3333 26.8333 16.3333H9.81658L12.4916 19.0084C12.9472 19.464 12.9472 20.2027 12.4916 20.6583C12.036 21.1139 11.2973 21.1139 10.8417 20.6583L6.17504 15.9916C5.71943 15.536 5.71943 14.7973 6.17504 14.3417L10.8417 9.67504C11.2973 9.21943 12.036 9.21943 12.4916 9.67504Z"/>
          </svg>
          <h6 className="btn-dsc">{title}</h6>
        </div>
    </div>
  )
}


function Login () {
  const HandleLogin = () => {
    window.location.href = 'http://localhost:3000/login';
  };
  return (
    <div className="login">
        <img className="sign-bg" src={bg} />
        <div className="spline">
          <Spline id="spline-container" scene="https://draft.spline.design/ORG3qbIqFFr8fevS/scene.splinecode"
          />
        </div>
        <div className="login-prop">
          <h6 className="sb-title">Use Your Mouse to Experience the 3D Animation</h6>
          <h1 className="title_">Unlock The Game <br/>And Have Fun</h1>
          
          <button className="btn-container" onClick={HandleLogin}>
              <Signbottun title={"Log in With 42 Intra"}/>
          </button>
          <button className="btn-container" >
              <Signbottun title={"Log in With Google Account"}/>
          </button>
        </div>
    </div>
  );
};
  

export default Login;