import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"
import logo from '../img/llanddev.png'
import { FormattedMessage } from "react-intl"

function Header(props) {

    return (
        <div className="navigation">
            <nav className="navbar navbar-expand-lg nav-llanddev bg-llanddev">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="llanddev"/>
                    </Link>
                    <button 
                        className="navbar-toggler" 
                        type="button" data-toggle="collapse" 
                        data-target="#navbarColor03" 
                        aria-controls="navbarColor03" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav nav-right">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">
                                    <FormattedMessage
                                        id="header_home"
                                        defaultMessage="Accueil"
                                    />
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/map">
                                    <FormattedMessage
                                        id="header_map"
                                        defaultMessage="Carte"
                                    />
                                </Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="/tableauDeBord">
                                    <FormattedMessage
                                        id="header_dashboard"
                                        defaultMessage="Tableau de bord"
                                    />
                                </Link>
                            </li> */}
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="/sujets">
                                    <FormattedMessage
                                        id="header_subjects"
                                        defaultMessage="sujets"
                                    />
                                </Link>
                            </li> */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">
                                    <FormattedMessage
                                        id="header_about"
                                        defaultMessage="A propos"
                                    />
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/detail">
                                    <FormattedMessage
                                        id="header_contactUs"
                                        defaultMessage="Nous contacter"
                                    />
                                </Link>
                            </li>
                        </ul>
                        <select className="llanddev-header-right" onChange={props.onChange} value={props.selected}>
                            <option value="mg">MG</option>
                            <option value="en">EN</option>
                            <option value="fr">FR</option>
                        </select>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default withRouter(Header);
