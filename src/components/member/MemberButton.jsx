import React from 'react';
import MemberService from '../../services/MemberService';
import { useNavigate } from "react-router-dom";

function MemberButton() {
    const isLogin = sessionStorage.getItem("IS_LOGIN");

    const navigate = useNavigate();


    const doLogin = () => {
        navigate("/member/login");
    }

    const doLogout = () => {
        MemberService.logoutMember().then((res) => {
            const response = res.data;
            if (response.resultCode === "SUCCESS") {
                alert(response.resultMessage);
                sessionStorage.setItem("IS_LOGIN", "N");
                navigate("/");
            } else {
                alert(response.resultMessage);
            }
        })
    }

    const doJoin = () => {
        navigate("/member/join");
    }

    const doMypage = () => {
        alert("마이페이지 미구현");
    }

    if (isLogin === "Y") {
        return (
            <>
                <div className='row'>
                    <button className='btn btn-primary' onClick={doLogout} >로그아웃</button>
                    <button className='btn btn-primary' onClick={doMypage} >마이페이지</button>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className='row'>
                    <button className='btn btn-primary' onClick={doJoin} >회원가입</button>
                    <button className='btn btn-primary' onClick={doLogin} >로그인</button>
                </div>
            </>
        )
    }

}

export default MemberButton;