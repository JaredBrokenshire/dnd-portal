import axios from "@/libs/axios";

const baseUrl = "/characters"

export default {
  update(id, dto) {
    return axios.put(`${baseUrl}/${id}/health`, dto)
  }
}