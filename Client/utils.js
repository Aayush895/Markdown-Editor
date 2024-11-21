import axios from 'axios'

export const customFetch = axios.create({
  baseURL: 'http://localhost:3002/api/v1',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})
