import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    totalIncome: 0,
    totalSpendings: 0,
    totalBalance: 0,
    totalResult : [],
    loading : false,
    error   : null
};

const addTask = ( state, action ) => {
    return updateObject( state, {
        totalIncome: 10,
        totalSpendings: 0,
        totalBalance: 0,
        totalResult : [],
        loading : true
} );
}

const deleteTask = (state,action) =>{
    return updateObject(state,
        {
            error:false,
            loading:false
        })
}

const taskFail = (state,action) =>{
    return updateObject(state,
        {
            error:action.error,
            loading:false
        })
}

const fetchTaskSuccess = ( state, action ) => {
    return updateObject( state, {
                    totalIncome: action.totalIncome,
                    totalSpending: action.totalSpending,
                    totalBalance: action.totalBalance,
                    totalResult : action.taskList,
                    error:false
            } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_INCOME: return addTask( state, action );
        case actionTypes.TASK_FAIL: return taskFail( state, action );
        case actionTypes.DELETE_TASK: return deleteTask(state, action);
        case actionTypes.FETCH_TASK: return fetchTaskSuccess(state, action);
        default: return state;
    }
};

export default reducer;