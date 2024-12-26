import { create } from 'zustand'

const fileStore = create((set) => ({
  fileList: [],
  isnewFileCreated: false,
  setFileList: (files) => {
    set((state) => {
      return {
        ...state,
        fileList: files,
      }
    })
  },
  setisNewFileCreated: (isCreated) => {
    set((state) => {
      return {
        ...state,
        isnewFileCreated: isCreated,
      }
    })
  },
}))

export default fileStore
