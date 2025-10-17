import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  withCredentials: true,
  baseURL: 'http://api.localdnd.com:7788'
})

Vue.prototype.$http = axiosIns

export default axiosIns
