import axios from 'axios'

const HTTP_METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch',
}

const axiosInstance = axios.create({
  baseURL: 'https://ictserver.herokuapp.com',
  withCredentials: true,
})

const config = {
  validateStatus: (status) => {
    return status < 500
  },
}

const call = (axiosInstance, methodType) => (url, ...params) => {
  const data = params.pop()
  return axiosInstance[methodType](url, data, config)
}

const callGet = call(axiosInstance, HTTP_METHODS.GET)
const callPost = call(axiosInstance, HTTP_METHODS.POST)

export const get = (url) => callGet(url, config)
export const post = (url, payload) => callPost(url, payload)
