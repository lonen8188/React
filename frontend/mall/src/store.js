import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './slices/loginSlice' // p353 추가

export default configureStore({
  reducer: { 
    "loginSlice": loginSlice // p353 추가
  }
})