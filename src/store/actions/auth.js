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
    localStorage.removeItem('userId');
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

        let getData = localStorage.getItem('userData');
        getData = JSON.parse(getData);
        var isUserCheck = null;
        let userID = uuidv4();
        let userData = {
            id : userID,
            email : email,
            password: password                
        };

        if(isSignup){

            if(getData == null){    
                userData=[userData];
                localStorage.setItem('userData',JSON.stringify(userData));           
            }else{

                isUserCheck = getData.filter((data) => {
                    if(data.email === userData.email){
                        return data;
                    }else {return false;}
                });
                if(isUserCheck.length > 0 ){
                    dispatch(authFail('User account is already created. Switch to sign in.'));  
                    return;
                }
                
                let userLength = getData.length;
                getData[userLength] =  userData;
                localStorage.setItem('userData',JSON.stringify(getData));
            }

            localStorage.setItem('userId',userID);
            dispatch(authSuccess(userID));

        }else{

            if(getData == null){    
                dispatch(authFail('No user Account. Please Sign Up.'));         
            }else{
                
                isUserCheck = getData.filter((data) => {
                    if(data.email === userData.email && data.password === userData.password){
                        return data;
                    }else {return false;}
                });
               
                if(isUserCheck.length === 0){
                    dispatch(authFail('No user Account. Please Sign Up.'));  
                   // return;
                }else{
                    localStorage.setItem('userId',isUserCheck[0].id);
                    dispatch(authSuccess(isUserCheck[0].id));
                }
            }
    
        }

   }
}