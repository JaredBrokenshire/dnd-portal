import axios from "@/libs/axios";
import HelperService from "@/services/HelperService";

const baseUrl = "/classes"

export default {
  list(filters) {
    const queryString = HelperService.buildSearchQueryString(filters)
    return axios.get(`${baseUrl}${queryString}`)
  },
  get(id) {
    return axios.get(`${baseUrl}/${id}`)
  },
  create(dto) {
    return axios.post(`${baseUrl}`, dto)
  },
  update(id, dto) {
    return axios.put(`${baseUrl}/${id}`, dto)
  },
  uploadLogo(id, file) {
    const formData = new FormData()
    formData.append('file', file)

    return axios.post(`${baseUrl}/${id}/upload/logo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  },
  uploadBackgroundImage(id, file) {
    const formData = new FormData()
    formData.append('file', file)

    return axios.post(`${baseUrl}/${id}/upload/background-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  },
  delete(id) {
    return axios.delete(`${baseUrl}/${id}`)
  }
}