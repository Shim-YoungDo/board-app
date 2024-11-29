import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MemberService from '../../services/MemberService';

function Login(props) {
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState,
    } = useForm({
        mode: 'onBlur'
    });

    const loginMember = (param) => {
        MemberService.loginMember(param).then((res) => {
            let response = res.data;
            if (response.resultCode === "SUCCESS") {
                let result = JSON.parse(response.data);
                alert(result.name + "님 안녕하세요");
                sessionStorage.setItem("IS_LOGIN", "Y");
                navigate("/");
            } else {
                alert(response.resultMessage);
            }
        })
    }

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit(loginMember)}>
                                <div className='form-group'>
                                    <label>아이디</label>
                                    <input type='text' placeholder='아이디를 입력해주세요' name='memberId' className='form-control'
                                        {...register("memberId", {
                                            required: { value: true, message: "아이디를 입력해주세요." },
                                            maxLength: {
                                                value: 20,
                                                message: "아이디는 20자리 까지 입력 가능합니다.",
                                            },
                                            pattern: {
                                                value: /^[ㄱ-ㅎ가-힣a-zA-Z0-9\s]+$/,
                                                message: "아이디에 특수문자는 불가능합니다."
                                            },
                                        })}
                                        error={formState.errors.memberId?.message ?? ''}
                                    />
                                    {formState.errors.memberId && <p style={{ color: 'red' }}>{formState.errors.memberId.message}</p>}
                                </div>
                                <div className='form-group'>
                                    <label>비밀번호</label>
                                    <input type='password' placeholder='비밀번호를 입력해주세요' name='memberPw' className='form-control'
                                        {...register("memberPw", {
                                            required: { value: true, message: "비밀번호를 입력해주세요." },
                                            maxLength: {
                                                value: 20,
                                                message: "비밀번호는 20자리 까지 입력 가능합니다.",
                                            },
                                        })}
                                        error={formState.errors.memberPw?.message ?? ''}
                                    />
                                    {formState.errors.memberPw && <p style={{ color: 'red' }}>{formState.errors.memberPw.message}</p>}
                                </div>
                                <button className="btn btn-success"
                                    disabled={!formState.isValid}
                                >로그인</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;