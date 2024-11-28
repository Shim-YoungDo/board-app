import axios from "axios";

const MEMBER_API_BASE_URL = "http://localhost:8080/customer";

class MemberService {
  idCheck(member) {
    return axios.post(MEMBER_API_BASE_URL + "/v1/customers/idCheck", member);
  }

  joinMember(member) {
    return axios.post(MEMBER_API_BASE_URL + "/v1/customers/member", member);
  }
}

export default new MemberService();
