import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Input from '../../components/UI/Input/Input';
// import Button from '../../components/UI/Button/Button';
// import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './TaskExpense.module.css';
// import * as actions from '../../store/actions/index';

class TaskExpense extends Component{


    render(){

        return(
            <div className={classes.TaskExpense}>
                test
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.userId
    }
}



export default connect(mapStateToProps)(TaskExpense);