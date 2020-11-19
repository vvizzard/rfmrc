import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"

function Service(props) {
    return (
        <div className="col-lg-6 service">
            <div className="service-content">
                <img src={props.img} alt=""/>
                <div className="service-content-fond">
                    <Link to={props.link}>
                        <div className="translucide">
                            <div className="service-content-description">
                                <span>{props.name}</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Service);
