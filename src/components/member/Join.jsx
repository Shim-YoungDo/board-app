import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MemberService from '../../services/MemberService';

function Join(props) {
    const [isIdDuplicated, setIsIdDuplicated] = useState(true);
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        setValue,
        getValues,
        formState,
        watch
    } = useForm({
        mode: 'onBlur'
    });

    useEffect(() => {
        // 아이디값 새로 입력할때마다 중복체크하도록
        setIsIdDuplicated(true);
    }, [watch("memberId")]);

    /**
     * 아이디 중복체크
     */
    const idCheck = () => {
        const memberId = getValues("memberId");

        if (!memberId) {
            alert("아이디를 입력해주세요.");
            return;
        };

        const objParam = {
            memberId: getValues("memberId")
        }

        MemberService.idCheck(objParam).then((res) => {
            let response = res.data;
            if (response.resultCode === "SUCCESS") {
                alert(response.resultMessage);
                setIsIdDuplicated(false);
            } else {
                alert(response.resultMessage);
                setIsIdDuplicated(true);
            }
        });
    }

    /**
     * 회원가입
     */
    const joinMember = (param) => {
        debugger;
        MemberService.joinMember(param).then((res) => {
            let response = res.data;
            if (response.resultCode === "SUCCESS") {
                alert("회원가입이 완료되었습니다. 로그인해주세요.");
                navigate("/");
            } else {
                alert(response.resultMessage);
            }
        });
    }

    return (
        <div>
            <div className="container">
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit(joinMember)}>
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
                                    <button type="button" className='btn btn-primary' onClick={idCheck} disabled={!isIdDuplicated || !getValues("memberId") || formState.errors.memberId}>아이디 중복 확인</button>
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
                                <div className='form-group'>
                                    <label>이름</label>
                                    <input type='text' placeholder='이름을 입력해주세요' name='memberName' className='form-control'
                                        {...register("memberName", {
                                            required: { value: true, message: "이름을 입력해주세요." },
                                            maxLength: {
                                                value: 20,
                                                message: "이름은 20자리 까지 입력 가능합니다.",
                                            },
                                            pattern: {
                                                value: /^[ㄱ-ㅎ가-힣a-zA-Z\ㄴ]+$/,
                                                message: "이름은 한글, 영문만 가능합니다."
                                            },
                                        })}
                                        error={formState.errors.memberName?.message ?? ''}
                                    />
                                    {formState.errors.memberName && <p style={{ color: 'red' }}>{formState.errors.memberName.message}</p>}
                                </div>
                                <div className='form-group'>
                                    <label>이메일</label>
                                    <input type='text' placeholder='이메일을 입력해주세요' name='email' className='form-control'
                                        {...register("email", {
                                            required: { value: true, message: "이메일을 입력해주세요." },
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                                                message: "이메일 형식이 아닙니다."
                                            },
                                        })}
                                        error={formState.errors.email?.message ?? ''}
                                    />
                                    {formState.errors.email && <p style={{ color: 'red' }}>{formState.errors.email.message}</p>}
                                </div>
                                <button className="btn btn-success"
                                    disabled={!formState.isValid || isIdDuplicated}
                                >회원가입</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Join;