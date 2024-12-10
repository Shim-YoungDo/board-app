import React, { useEffect, useState } from "react";
import BoardService from "../services/BoardService";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as common from "../utils/common_function";

function CreateBoardComponent() {
    const navigate = useNavigate();
    const params = useParams();
    const [no] = useState(params.no);
    const [searchParams] = useSearchParams();

    const {
        handleSubmit,
        register,
        setValue,
        formState
    } = useForm({
        mode: 'onBlur'
    });

    /**
     * 타입
     * save : 등록
     * update : 수정
     */
    const createType = searchParams.get("createType");

    useEffect(() => {
        if (createType === "update") {
            BoardService.getBoardDetail(no).then(res => {
                let response = res.data;
                if (response.resultCode === "SUCCESS") {
                    const data = JSON.parse(response.data);
                    setValue("no", data.no);
                    setValue("type", data.type);
                    setValue("title", data.title);
                    setValue("contents", data.contents);
                } else {
                    alert(response.resultMessage);
                }
            });
        }
    }, []);

    const createBoard = async (param) => {
        if (!await common.checkLogin()) {
            alert("장시간 입력이 없어 정보를 가져올 수 없습니다. 다시 진행해주세요.");
            sessionStorage.setItem("IS_LOGIN", "N");
            navigate("/");
            return false;
        }
        if (createType === "update") {
            BoardService.updateBoard(no, param).then(res => {
                let response = res.data;
                if (response.resultCode === "SUCCESS") {
                    alert("수정이 완료되었습니다.");
                    navigate('/board');
                } else {
                    alert(response.resultMessage);
                    if (response.apiResultCode === "0099") {
                        sessionStorage.setItem("IS_LOGIN", "N");
                        navigate("/");
                    }
                }
            });

        } else {
            BoardService.createBoard(param).then(res => {
                let response = res.data;
                if (response.resultCode === "SUCCESS") {
                    alert("저장이 완료되었습니다.");
                    navigate('/board');
                } else {
                    alert(response.resultMessage);
                    if (response.apiResultCode === "0099") {
                        sessionStorage.setItem("IS_LOGIN", "N");
                        navigate("/");
                    }
                }
            });
        }
    }

    const cancel = () => {
        navigate('/board');
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">새 글을 작성해주세요
                            <div className="card-body">
                                <form onSubmit={handleSubmit(createBoard)}>
                                    <div className="form-group">
                                        <label> Type </label>
                                        <select placeholder="type" name="type" className="form-control"
                                            {...register("type", {})}>
                                            <option value="1">자유게시판</option>
                                            <option value="2">질문과 답변</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label> Title </label>
                                        <input type="text" placeholder="title" name="title" className="form-control"
                                            {...register("title", {
                                                required: { value: true, message: "제목을 입력해주세요." },
                                                maxLength: {
                                                    value: 50,
                                                    message: "제목은 50자리 까지 입력 가능합니다.",
                                                },
                                            })}
                                            error={formState.errors.title?.message ?? ''}
                                        />
                                        {formState.errors.title && <p style={{ color: 'red' }}>{formState.errors.title.message}</p>}
                                    </div>
                                    <div className="form-group">
                                        <label> Contents </label>
                                        <textarea placeholder="contents" name="contents" className="form-control"
                                            {...register("contents", {
                                                required: { value: true, message: "내용을 입력해주세요." },
                                                maxLength: {
                                                    value: 100,
                                                    message: "100자리까지 입력해주세요",
                                                },
                                            })}
                                        />
                                        {formState.errors.contents && <p style={{ color: 'red' }}>{formState.errors.contents.message}</p>}
                                    </div>
                                    <button className="btn btn-success"
                                        disabled={!formState.isValid}
                                    >Save</button>
                                    <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: "10px" }}>취소</button>
                                </form>
                            </div>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateBoardComponent;