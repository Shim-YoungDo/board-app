import axios from "axios";

const BOARD_API_BASE_URL = "/api/board";

class BoardService {
  getBoards() {
    return axios.get(BOARD_API_BASE_URL);
  }

  createBoard(board) {
    return axios.post(BOARD_API_BASE_URL, board);
  }

  updateBoard(no, board) {
    return axios.put(BOARD_API_BASE_URL + "/" + no, board);
  }

  getBoardDetail(no) {
    return axios.get(BOARD_API_BASE_URL + "/" + no);
  }

  deleteBoard(no) {
    return axios.delete(BOARD_API_BASE_URL + "/" + no);
  }
}

export default new BoardService();
