import axios from "@/libs/axios";

const baseUrl = "/characters"

export default {
  update(id) {
    return axios.put(`${baseUrl}/${id}/inspiration`)
  },
}