import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
})

api.interceptors.request.use((config) => {
  // TODO: attach auth token when ready
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // global error handling, Sentry capture can be added
    return Promise.reject(err)
  }
)

export default api
