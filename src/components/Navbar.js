import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
        <h3><Link to="/">Messenger</Link></h3>
        <div>
            <Link to="/register">Register</Link>
            <Link to="/Login">Login</Link>
        </div>
    </nav>
  )
}

export default Navbar