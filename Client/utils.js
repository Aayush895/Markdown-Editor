import axios from 'axios'

// Explicitly accepts only form-data
export const customFetch = axios.create({
  baseURL: 'http://localhost:3002/api/v1',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

// Explicitly accepts only data which is sent as raw or converted to json and then sent to server
export const customLoginFetcher = axios.create({
  baseURL: 'http://localhost:3002/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Custom axios for sending queries/requests to the file routes

export const customFileFetcher = axios.create({
  baseURL: 'http://localhost:3002/api/v1/documents',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
})
