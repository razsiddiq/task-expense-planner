import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        {
            props.isAuthenticated ? <NavigationItem link="/task-planner" active>Task Planner</NavigationItem> : null
        }
        {
            props.isAuthenticated ? <NavigationItem link="/logout">Logout</NavigationItem> : <NavigationItem link="/">Login</NavigationItem>
        }
        
    </ul>
);

export default navigationItems;