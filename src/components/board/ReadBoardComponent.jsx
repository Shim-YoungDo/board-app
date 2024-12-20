import React, { useEffect, useState } from 'react';
import BoardService from '../../services/BoardService';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import * as common from "../../utils/common_function";

function ReadBoardComponent() {
    const [board, setBoard] = useState({});
    const params = useParams();
    const [no] = useState(params.no);
    const navigate = useNavigate();

    useEffect(() => {
        BoardService.getBoardDetail(no).then(res => {
            let response = res.data;
            if (response.resultCode === "SUCCESS") {
                const data = JSON.parse(response.data);
                setBoard(data);
            } else {
                alert(response.resultMessage);
            }
        });
    }, []);

    const returnBoardType = (type) => {
        let strType = "";

        if (type === 1) {
            strType = "자유게시판";
        } else if (type === 2) {
            strType = "QnA 게시판";
        } else {
            strType = "기타";
        }

        return (
            <div className='row'>
                <label> {strType} </label>
            </div>
        )
    }

    const returnDate = (regDt, updateDt) => {
        return (
            <div className='row'>
                <label>생성일 : [ {dayjs(regDt).format('YYYY-MM-DD HH:MM')} ] / 최종 수정일 : [ {dayjs(updateDt).format('YYYY-MM-DD HH:MM')} ]</label>
            </div>
        )
    }

    const goBoardList = () => {
        navigate("/board");
    }

    const goUpdateBoard = () => {
        navigate("/update-board/" + no + "?createType=update");
    }

    /**
     * 삭제처리
     */
    const deleteBoard = async () => {
        if (!await common.checkLogin()) {
            alert("장시간 입력이 없어 정보를 가져올 수 없습니다. 다시 진행해주세요.");
            sessionStorage.setItem("IS_LOGIN", "N");
            navigate("/");
            return false;
        }

        if (window.confirm("정말 삭제하시겠습니까?")) {
            BoardService.deleteBoard(no).then(res => {
                let response = res.data;
                if (response.resultCode === "SUCCESS") {
                    alert("삭제되었습니다.");
                    navigate("/board");
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

    return (
        <div>
            <div className='card col-md-6 offset-md-3'>
                <h3 className='text-center'>{board.title}</h3>
                <div className='card-body'>
                    {returnBoardType(board.type)}

                    <div className='row'>
                        <label> Contents </label> : <br></br>
                        <textarea value={board.contents} readOnly />
                    </div>

                    <div className='row'>
                        <label> 작성자 </label> : {board.memberId}
                    </div>
                    {returnDate(board.createdTime, board.updatedTime)}
                    <button className='btn btn-primary' onClick={goBoardList} style={{ marginLeft: "10px" }}>글 목록으로 이동</button>
                    {board.updateAvalYn === "Y" &&
                        <>
                            <button className='btn btn-primary' onClick={goUpdateBoard} style={{ marginLeft: "10px" }}>수정하러 가기</button>
                            <button className='btn btn-primary' onClick={deleteBoard} style={{ marginLeft: "10px" }}>삭제하기</button>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default ReadBoardComponent;