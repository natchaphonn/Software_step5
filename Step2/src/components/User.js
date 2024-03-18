import React from 'react';
import { createMovie } from '../../services/UsersServices';

const User = ({ name, location, email, picture, login }) => {
    const data = (
    `{
        "name_first": "${name.first}",
        "email": "${login.username}",
        "password": "${login.password}"
    }` )
    createMovie(data);

    return (
        <div className="random-user">
            <div className="user-image">
                <img src={picture.medium} alt={name.first} />
            </div>
            <div><strong>Country:</strong> {location.country}</div>
            <div><strong>Email:</strong> {email}</div>
            <div><strong>Login:</strong> {login.username}</div>
            <div><strong>Password:</strong> {login.password}</div>
            <div><strong>Name:</strong> {name.first} {name.last}</div>
        </div>
    );
};

export default User;