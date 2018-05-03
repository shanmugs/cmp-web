import React from 'react';
import { Link } from 'react-router';


/**
 * @constructor
 * @param props
 * @returns {Component}
 */
const Navbar = (props) => {
    const router = props.router;
    const nbsp = '\u00a0';

    const goBack = (e) => {
        e.preventDefault();
        router.goBack();
    };

    const goForward = (e) => {
        e.preventDefault();
        router.goForward();
    };

    const style = {
        textAlign: 'center',
        borderBottom: '1px solid #666',
        paddingBottom: '5px',
    };

    return (
        <p style={style}>
            <a href="#go-back" onClick={goBack}>Back</a> {nbsp}| {nbsp}
            <Link to="/">Home</Link> {nbsp}| {nbsp}
            <Link to="/login">Login</Link> {nbsp}| {nbsp}
            <Link to="/logout">Logout</Link> {nbsp}| {nbsp}
            <Link to="/dashboard">Dashboard</Link> {nbsp}| {nbsp}
            <Link to="/users">Users</Link> {nbsp}| {nbsp}
            <Link to="/users/profile">Profile</Link> {nbsp}| {nbsp}
            <Link to="/users/history">History</Link> {nbsp}| {nbsp}
            <a href="#go-forward" onClick={goForward}>Forward</a>
        </p>
    );
};

export default Navbar;
