import React, { useEffect, useState } from 'react';
import BoardService from '../services/BoardService';
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';

function ListBoardComponent() {
    const [boards, setBoards] = useState([]);
    const isLogin = sessionStorage.getItem("IS_LOGIN");

    const navigate = useNavigate();

    useEffect(() => {
        BoardService.getBoards().then((res) => {
            let response = res.data;
            if (response.resultCode === "SUCCESS") {
                const data = JSON.parse(response.data);
                setBoards(data.boardList);
            } else {
                alert(response.resultMessage);
            }
        });
    }, [])

    const createBoard = () => {
        if (isLogin === "N") {
            alert("글작성은 로그인 후 가능합니다. 로그인 해주세요.");
            navigate("/member/login");
            return false;
        }
        navigate("/create-board");
    }

    const readBoard = (no) => {
        navigate(`/read-board/${no}`);
    }

    return (
        <div>
            <h2 className='text-center'>Boards List</h2>
            <div className='row'>
                <button className='btn btn-primary' onClick={createBoard}>글 작성</button>
            </div>
            <div className='row'>
                <table className='table table-striped table-boardered'>
                    <thead>
                        <tr>
                            <th>글 번호</th>
                            <th>타이틀 </th>
                            <th>작성자 </th>
                            <th>작성일 </th>
                            <th>갱신일 </th>
                            <th>좋아요수</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            boards.map(
                                board =>
                                    <tr key={board.no}>
                                        <td>{board.no}</td>
                                        <td> <a onClick={() => readBoard(board.no)}> {board.title} </a> </td>
                                        <td>{board.memberId}</td>
                                        <td>{dayjs(board.createdTime).format('YYYY-MM-DD HH:mm:ss')}</td>
                                        <td>{dayjs(board.updatedTime).format('YYYY-MM-DD HH:mm')}</td>
                                        <td>{board.likes}</td>
                                        <td>{board.counts}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default ListBoardComponent;