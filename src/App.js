import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import TaskExpense from './containers/TaskExpense/TaskExpense';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component{
  render(){

    let routes = (
      <Switch>
        <Route path="/" exact component={Auth} /> 
        <Redirect to="/"/>
      </Switch>
    );

    if(this.props.isAuthentiated){
      routes = (
      <Switch>
        <Route path="/" exact component={Auth} /> 
        <Route path="/task-expense" exact component={TaskExpense} /> 
        <Route path="/logout" exact component={Logout} />
        <Redirect to="/"/>
      </Switch>
      );
    }


    return(
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return{
    isAuthentiated : state.auth.userId !== null
  }
}



export default withRouter(connect(mapStateToProps)(App));
