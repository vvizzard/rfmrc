import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"

function Partners(props) {
    const partners = [];
    partners.push(
        <div key={1} className="col-sm-3 partner">
            <div className="partner-content">        
                <a href="https://www.giz.de/" target="__blank">
                    <img src="https://www.giz.de/static/en/images/giz-logo.gif" alt=""/>
                </a>
            </div>
        </div>
    );
    partners.push(
        <div key={2} className="col-sm-3 partner">
            <div className="partner-content">        
                <a href="https://earthengine.google.com/" target="__blank">
                    <img src="https://earthengine.google.com/static/images/earth-engine-logo.png" alt=""/>
                </a>
            </div>
        </div>
    );

    return (
        <div>
            <h1>Partenaires</h1><br/>
            <div className="row">
                {partners}
            </div>
        </div>
    )
}

export default withRouter(Partners);
