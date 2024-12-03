import MemberService from "../services/MemberService";

export function checkLogin() {
  let isLogin = false;
  MemberService.checkLogin().then((res) => {
    let response = res.data;
    if (response.resultCode === "SUCCESS") {
      isLogin = true;
    }
  });
  return isLogin;
}
