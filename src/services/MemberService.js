import axios from "axios";

const MEMBER_API_BASE_URL = "/user";

class MemberService {
  idCheck(member) {
    return axios.post(MEMBER_API_BASE_URL + "/v1/idCheck", member);
  }

  joinMember(member) {
    return axios.post(MEMBER_API_BASE_URL + "/v1/member", member);
  }

  loginMember(member) {
    return axios.post(MEMBER_API_BASE_URL + "/v1/login", member);
  }

  logoutMember() {
    return axios.get(MEMBER_API_BASE_URL + "/v1/logout");
  }

  checkLogin() {
    return axios.get(MEMBER_API_BASE_URL + "/v1/checkLogin");
  }
}

export default new MemberService();
