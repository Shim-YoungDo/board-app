import axios from "axios";

const MEMBER_API_BASE_URL = "/customer";

class MemberService {
  idCheck(member) {
    return axios.post(MEMBER_API_BASE_URL + "/v1/customers/idCheck", member);
  }

  joinMember(member) {
    return axios.post(MEMBER_API_BASE_URL + "/v1/customers/member", member);
  }

  loginMember(member) {
    return axios.post(MEMBER_API_BASE_URL + "/v1/customers/login", member);
  }

  logoutMember() {
    return axios.get(MEMBER_API_BASE_URL + "/v1/customers/logout");
  }
}

export default new MemberService();
