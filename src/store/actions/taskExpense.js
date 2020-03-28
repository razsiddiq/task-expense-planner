import * as actionTypes from './actionTypes';

export const taskFail= (error) =>{
    return{
        type:actionTypes.TASK_FAIL,
        error:error
    }
}

export const addTask= ( userId, amount, description, date, isAddIncome ) => {

    return dispatch => {

        if(amount === ''){
            dispatch(taskFail('Amount field is required.'));
            return;
        }else if(description === ''){
            dispatch(taskFail('Description field required.'));
            return;
        }else if(date === ''){
            dispatch(taskFail('Date field required.'));
            return;
        }



        let userID = localStorage.getItem('userId');
        let taskData = {
            userId : userID,
            amount : amount,
            description: description,
            date: date,
            isAddIncome: isAddIncome              
        };


        let getData = localStorage.getItem('taskData');
        getData = JSON.parse(getData);
        
        if(getData == null){              
            taskData=[taskData];
            localStorage.setItem('taskData',JSON.stringify(taskData));  
        }else{
            let taskLength = getData.length;
            getData[taskLength] =  taskData;
            localStorage.setItem('taskData',JSON.stringify(getData));
        }
        
        dispatch(fetchTask(userID));



    };

};

export const deleteTaskStart = ( index ) => {
    return {
        type: actionTypes.DELETE_TASK,
        item: index
    };
}


export const deleteTask = ( removeIndex ) => {
    return dispatch => {
        dispatch(deleteTaskStart()); 
   
        let getData = localStorage.getItem('taskData');
        getData = JSON.parse(getData);
    
        var result = getData.filter( (val,index) => {
            if(index !== removeIndex){
               return val;
            }else {return false;}
        })
        localStorage.setItem('taskData',JSON.stringify(result));
        let userID = localStorage.getItem('userId');
        dispatch(fetchTask(userID));
    }
   
};

export const fetchTaskSuccess = ( result ) => {
    
    let taskList = [];
    let balance = 0;
    let income = 0;
    let spending = 0; 
    if(result.data.length > 0 ){
        taskList = result.data;
        balance = result.balance;
        income = result.Income;
        spending = result.Spending
    }

    return {
        type: actionTypes.FETCH_TASK,
        taskList: taskList,
        totalBalance: balance,
        totalIncome : income,
        totalSpending: spending
    };
};



export const fetchTask = ( userId ) => {
    return dispatch => {

        let userID = localStorage.getItem('userId');

        let getData = localStorage.getItem('taskData');
        getData = JSON.parse(getData);
        
        if(getData == null){    
            dispatch(fetchTaskSuccess([]));        
        }else{
            
             var result = getData.filter( val => {
                 if(userID === val.userId){
                    return val;
                 }else {return false;}
             })
              
             
             const Income =result.map( val => {
                if(val.isAddIncome){
                    return val.amount;
                 }else {return 0;}
             } )
             .reduce( ( sum, el ) => {
                 return parseInt(sum) + parseInt(el);
             }, 0 );

             const Spending =result.map( val => {
                if(!val.isAddIncome){
                    return val.amount;
                 }else {return 0;}
             } )
             .reduce( ( sum, el ) => {
                 return parseInt(sum) + parseInt(el);
             }, 0 );



             const balance = Income - Spending;
             
             const data = {
                 data : result,
                 balance: balance,
                 Income : Income,
                 Spending: Spending
             }
             dispatch(fetchTaskSuccess(data));    
        }
      
    };
};