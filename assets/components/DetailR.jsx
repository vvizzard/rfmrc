import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"

function DetailR(props) {
    return (
        <section className="section-bg detail">
            <div className="section-bg-opacity">
                <div className="container white-bg disposition shadow">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={props.img} alt=""/>
                        </div>
                        <div className="col-md-6">
                            <h2>{props.name}</h2>
                            <span>{props.description}</span>
                            <Link to={props.link}><button className="btn btn-default btn-launch">Lancer le service</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default withRouter(DetailR);
