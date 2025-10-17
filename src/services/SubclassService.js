import axios from "@axios"
import HelperService from "@/services/HelperService";

const baseUrl = "/subclasses"

export default {
  list(classId, filters) {
    const queryString = HelperService.buildSearchQueryString(filters)
    return axios.get(`${baseUrl}/${classId}${queryString}`)
  },
  get(classId, subclassId) {
    return axios.get(`${baseUrl}/${classId}/${subclassId}`)
  },
  create(dto) {
    return axios.post(`${baseUrl}`, dto)
  },
  update(classId, subclassId, dto) {
    return axios.put(`${baseUrl}/${classId}/${subclassId}`, dto)
  },
  delete(classId, subclassId) {
    return axios.delete(`${baseUrl}/${classId}/${subclassId}`)
  },
  uploadLogo(classId, subclassId, file) {
    const formData = new FormData()
    formData.append('file', file)

    return axios.post(`${baseUrl}/${classId}/${subclassId}/upload/logo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  },
}
