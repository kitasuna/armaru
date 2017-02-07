'use strict'

import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Login from './Login'
import Logout from './Logout'

export default class Navbar extends Component {
  render() {
    const { isAuthenticated } = this.props

    return (
        <div className="container-fluid" style={{marginTop: '2%' }}>
          <nav className="navbar navbar-default" role="navigation">
            
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand">Armaru</Link>
            </div>
            
            <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
            {isAuthenticated &&
            <li><Link to="/reminders" activeClassName="active">Reminders</Link></li>
            }

            {!isAuthenticated && 
            <li><Link to="/register" activeClassName="active">Register</Link></li>
            }

            {!isAuthenticated && 
            <li><Link to="/login" activeClassName="active">Login</Link></li>
            }

              

                {isAuthenticated &&
                  <li>
                    <Logout />
                  </li>
                }
            </ul>

            </div>
          </nav>
        </div>
    )
  }
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}
