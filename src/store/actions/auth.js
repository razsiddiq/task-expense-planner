import * as actionTypes from './actionTypes';
import { v4 as uuidv4 } from 'uuid';

export const authStart = () =>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (userId) =>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        userId :userId
    }
}


export const authFail= (error) =>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const auth = (email, password, isSignup) =>{
   return dispatch => {
       dispatch(authStart());

        if(email === ''){
            dispatch(authFail('Email field is required.'));
        }else if(password === ''){
            dispatch(authFail('Password field required.'));
        }

        if(isSignup){

            let userID = uuidv4();
            let userData = {
                id : userID,
                email : email,
                password: password                
            };
  
            let getData = localStorage.getItem('userData');
            getData = JSON.parse(getData);
            
            if(getData == null){    
                userData=[userData];
                localStorage.setItem('userData',JSON.stringify(userData));           
            }else{
                let userLength = getData.length;
                getData[userLength] =  userData;
                localStorage.setItem('userData',JSON.stringify(getData));
            }

            localStorage.setItem('userId',userID);
            dispatch(authSuccess(userID));

        }else{

    
        }

   }
}



