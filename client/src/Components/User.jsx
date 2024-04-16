import React, { useEffect, useState } from 'react';
import { useAuth } from "./store/auth";;
import {Link, NavLink} from 'react-router-dom';
import "./Styles/User.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function User() {
    const {isLoading, isLoggedIn, user} = useAuth();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    console.log("hello", user.username);

    return (
        <div className='user-container'>
            <div className="detail-container">
                <div className="picture">
                    <AccountCircleIcon style={{ fontSize: '10rem', color: '#2A5752',}}/>
                </div>
                <div className="details">
                        <div><b>Username:</b> {user.username}</div>
                        <div><b>Email:</b> {user.email}</div>
                        <div><b>Phone:</b> {user.phone}</div>
                </div>
                
            </div>
            
            <NavLink to="/logout"><button>Log Out</button></NavLink>
        </div>

    )
}

export default User;
