import { publicRequest } from "../requestMethods";
import {loginFailure, loginStart,loginSuccess,logoutSucess} from "./userRedux"
import {removeProduct} from "./cartRedux"
export const login = async(dispatch,user)=>{
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/login",user)
        dispatch(loginSuccess(res.data))
    }catch{
        dispatch(loginFailure())        
    }
}

export const logout =async(dispatch,user) => {
  localStorage.removeItem('user')
  localStorage.removeItem('cart')
  dispatch(logoutSucess())
  dispatch(removeProduct()) 
}