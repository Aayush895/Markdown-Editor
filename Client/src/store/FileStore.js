import { create } from 'zustand'

const fileStore = create((set) => ({
  fileList: [],
  isnewFileCreated: false,
  selectedFileId: { name: '', id: '' },
  isFileTabVisible: false,
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
  setSelectedFileId: (file) => {
    set((state) => {
      return {
        ...state,
        selectedFileId: file,
      }
    })
  },
  setIsFileTabVisible: (isVisible) => {
    set((state) => {
      return {
        ...state,
        isFileTabVisible: isVisible,
      }
    })
  },
}))

export default fileStore
