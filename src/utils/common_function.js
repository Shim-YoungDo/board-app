import MemberService from "../services/MemberService";

export async function checkLogin() {
  let isLogin = false;
  await MemberService.checkLogin().then((res) => {
    let response = res.data;
    if (response.resultCode === "SUCCESS") {
      isLogin = true;
    }
  });
  return isLogin;
}
