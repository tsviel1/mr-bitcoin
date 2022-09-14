import React from 'react'
import { NavLink } from 'react-router-dom'

export function Header({loggedInUser}) {
    return (
        <section className="Header flex align-center space-between container">
            <div className="Logo uppercase">
                <h2>Mr. Bitcoin</h2>
            </div>
            <nav className='Main-nav flex gap-1'>
                <NavLink exact to='/'>Home Page</NavLink>
                <NavLink to='/signup'>Signup</NavLink>
                <NavLink to='/contact'>Contact List</NavLink>
                <NavLink to='/statistics'>Statistics</NavLink>
            </nav>
            <div>
                <h3>{loggedInUser?.name} | ${loggedInUser?.coins}</h3>
            </div>
        </section>
    )
}

