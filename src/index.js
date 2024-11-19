import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/**
 * dayjs 설정
 */
import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear"; // 윤년 판단 플러그인
import "dayjs/locale/ko"; // 한국어 가져오기
import * as utc from "dayjs/plugin/utc";
import * as timezone from "dayjs/plugin/timezone";

dayjs.extend(isLeapYear); // 플러그인 등록
dayjs.locale("ko"); // 언어 등록
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul"); // 한국 시간

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
