import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"
import { FormattedMessage } from "react-intl"

function Footer(props) {

    return (
        <footer className="footer">
            <div className="container disposition shadow">
                <div className="row">
                    <div className="col-md-4">
                        <div>
                            <span>Copyright © - llanddev 2020</span>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <span>
                            <FormattedMessage
                                id="footer_links"
                                defaultMessage="Liens"
                            />
                        </span>
                        <a>
                            <FormattedMessage
                                id="header_contactUs"
                                defaultMessage="Carte"
                            />
                        </a>
                        <a>
                            <FormattedMessage
                                id="header_about"
                                defaultMessage="A propos"
                            />
                        </a>
                    </div>
                    <div className="col-md-4">
                        <span>
                            <FormattedMessage
                                id="footer_language"
                                defaultMessage="Langues"
                            />
                        </span>
                        <br/>
                        <button onClick={props.onClick} className="lang-a" value="mg">Malagasy</button>
                        <button onClick={props.onClick} className="lang-a" value="fr">Français</button>
                        <button onClick={props.onClick} className="lang-a" value="en">English</button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default withRouter(Footer);
