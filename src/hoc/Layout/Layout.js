import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }


    render () {
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated}/>                
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}


const mapStateToProps = state =>{
    return{
        isAuthenticated : state.auth.userId!==null
    }
}

export default connect(mapStateToProps)(Layout);