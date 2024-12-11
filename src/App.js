import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListBoardComponent from "./components/board/ListBoardComponent";
import HeaderComponent from "./components/common/HeaderComponent";
import FooterComponent from "./components/common/FooterComponent";
import CreateBoardComponent from "./components/board/CreateBoardComponent";
import ReadBoardComponent from "./components/board/ReadBoardComponent";
import MemberButton from "./components/member/MemberButton";
import Join from "./components/member/Join";
import Login from "./components/member/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <HeaderComponent />
        <MemberButton />
        <div className="container">
          <Routes>
            <Route path="/" exact element={<ListBoardComponent />}></Route>
            <Route path="/board" element={<ListBoardComponent />}></Route>
            <Route
              path="/create-board"
              element={<CreateBoardComponent />}
            ></Route>
            <Route
              path="/update-board/:no"
              element={<CreateBoardComponent />}
            ></Route>
            <Route
              path="/read-board/:no"
              element={<ReadBoardComponent />}
            ></Route>
            <Route path="/member/join" element={<Join />}></Route>
            <Route path="/member/login" element={<Login />}></Route>
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
