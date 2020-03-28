import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './TaskExpense.module.css';
import { checkValidity, defaultDate } from '../../shared/utility';
import * as actions from '../../store/actions/index';

class TaskExpense extends Component{
        state = {
                    controls : {
                        amount: {
                            elementType: 'input',
                            elementConfig: {
                                type: 'number',
                                placeholder: 'Enter Amount'
                            },
                            value: '',
                            validation: {
                                required: true,
                                isNumeric: true
                            },
                            valid: false,
                            touched: false
                        },
                        description: {
                            elementType: 'input',
                            elementConfig: {
                                type: 'input',
                                placeholder: 'Description'
                            },
                            value: '',
                            validation: {
                                required: true,
                                minLength :6,
                            },
                            valid: false,
                            touched: false
                        },
                        date: {
                            elementType: 'input',
                            elementConfig: {
                                type: 'date',
                                placeholder: 'Select Date'
                            },
                            value: defaultDate(),
                            validation: {
                                required: true
                            },
                            valid: false,
                            touched: false
                        }
                    },
                    isAddIncome : true,
                    display : false,
                    load : true,
                }


    showIncomeForm = () => {
        this.setState({isAddIncome:true});
        this.setState({display:true});
        this.resetForm();
    }            


    showSpendingForm = () => {
        this.setState({isAddIncome:false});
        this.setState({display:true});
        this.resetForm();
    }     
    
    cancelForm = () => {
        this.setState({isAddIncome:true});
        this.setState({display:false});
        this.resetForm();
    }

    componentDidMount(){
           this.props.onListTask(this.props.userId);        
           this.setState({load:false});     

           

    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.taskList.length!==this.props.taskList.length){
            if(!this.props.error){
                    this.setState({display:false});
                 }
        }
      }

    resetForm = () =>{
        const updatedControls = {
            ...this.state.controls,
            amount:{
                ...this.state.controls.amount,
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            description:{
                ...this.state.controls.description,
                value: '',
                valid: false,
                validation: {
                    required: true,
                    minLength :6,
                },
                touched: false         
            }
        };
        this.setState({controls:updatedControls});
        
    }


    inputChangedHandler = (event, controlName) => {

        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls:updatedControls});

    }

    submitForm = (event) =>{
        event.preventDefault();
        this.props.onAddTask(this.props.userId,this.state.controls.amount.value, this.state.controls.description.value, this.state.controls.date.value, this.state.isAddIncome);
        
    }

    

    deleteHandler = (index) => {
        this.props.onDeleteTask(index);
    }

    render(){

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ));

        if(this.props.loading){
            form = <Spinner/>
        }  
        
        let lists= (this.state.load) ? <Spinner/> : <div style={{color:'red',textAlign:'center',paddingTop: '3em'}}>No Data. Please Add Your Task.</div>
        
        if(this.props.taskList.length > 0 ){
            lists = this.props.taskList.map((list,index) => {
                return (
                    <div key={index} className={classes.listRow}>
                        <div className={classes.dateRow}>{list.date}</div>
                        <div className={classes.spanRow}>
                        <span className={(list.isAddIncome) ? classes.green : classes.red}>{list.amount} Kc</span>
                        <span>{list.description}</span>
                        <span className={classes.close} onClick={() => this.deleteHandler(index)}>X</span>
                        </div>
                    </div>
                );
            });
        }

  
        let errorMessage =  null;

        if(this.props.error){
            errorMessage = (
                <p style={{color:'red'}}>{this.props.error}</p>
            )
        }

        return(
            <div className={classes.TaskExpense}>
               <div className={classes.Header}>
                <div>Balance</div>
                <h1>{this.props.totalBalance} Czk</h1>
                <div>
                    <span style={{color:'green'}}>Income {this.props.totalIncome} Kc</span><span  style={{color:'red',paddingLeft:'20px'}} >Spendings {this.props.totalSpending} Kc</span>
                </div>
                
               </div>
               <div className={classes.listData}>
                   {lists}
               </div>
               <div className={classes.centerButton}>
                    
                    { (this.state.display) ? 
                        <div className={classes.formElement}>
                            <h1> 
                                { (this.state.isAddIncome) ? 'Add Income' : 'Add Spending'}
                            </h1>
                            {errorMessage}
                            <form onSubmit={this.submitForm}>
                                {form}
                                <Button btnType="Success">Submit</Button>
                                <Button btnType="Danger" clicked={this.cancelForm}>Cancel</Button>
                            </form>
                        </div>
                    : null }

                    { (!this.state.display) ? (
                        <div>
                        <Button btnType="Success" clicked={this.showIncomeForm}>Add Income</Button>
                        <Button btnType="Danger" clicked={this.showSpendingForm}>Add Spending</Button>
                        </div>
                      ) : null}


                    
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.userId,
        loading:state.task.loading,
        error : state.task.error,
        userId : state.auth.userId,
        totalIncome : state.task.totalIncome,
        totalSpending : state.task.totalSpending,
        totalBalance : state.task.totalBalance,
        taskList : state.task.totalResult,
    }
}




const mapDispatchToProps = dispatch => {
    return{
        onAddTask : (userId, amount, description, date, isAddIncome) => dispatch(actions.addTask(userId, amount, description, date, isAddIncome)),
        onListTask : (userId) => dispatch(actions.fetchTask(userId)),
        onDeleteTask : (index) => dispatch(actions.deleteTask(index)),
        
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(TaskExpense);