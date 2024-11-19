import React, { useEffect, useState } from "react";
import BoardService from "../services/BoardService";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function CreateBoardComponent() {
    const navigate = useNavigate();
    const params = useParams();
    const [no] = useState(params.no);
    const [board, setBoard] = useState({});
    const [searchParams] = useSearchParams();
    const [isDisabled, setIsDisabled] = useState(true);

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
                    const data = response.data;
                    Object.entries(data).map((e, idx) => {
                        return setValue(e[0], e[1]);
                    });
                } else {

                }
            });
        }
    }, []);

    const createBoard = (param) => {
        BoardService.createBoard(param).then(response => {
            const msgType = createType == "update" ? "수정" : "저장";

            alert(msgType + "이 완료되었습니다.");
            navigate('/board');
        });
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
                                                    value: 8,
                                                    message: "제목은 8자리 까지 입력 가능합니다.",
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
                                                    value: 9,
                                                    message: "9자리까지 입력해주세요",
                                                },
                                            })}
                                        />
                                        {formState.errors.contents && <p style={{ color: 'red' }}>{formState.errors.contents.message}</p>}
                                    </div>
                                    <div className="form-group">
                                        <label> MemberNo  </label>
                                        <input placeholder="memberNo" name="memberNo" className="form-control"
                                            {...register("memberNo", {
                                                required: { value: true, message: "등록번호를 입력해주세요." },
                                                maxLength: {
                                                    value: 10,
                                                    message: "10자리까지 입력해주세요",
                                                },
                                            })}
                                            disabled={createType == "update" ? true : false} />
                                        {formState.errors.memberNo && <p style={{ color: 'red' }}>{formState.errors.memberNo.message}</p>}
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