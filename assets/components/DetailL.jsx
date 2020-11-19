import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"

function DetailL(props) {
    var titre = null;
    titre = props.title ? <div><h1>{props.title}</h1><br/></div> : "";
    return (
        <section className="detail">
            <div className="container white-bg disposition shadow">
                {titre}
                <div className="row">
                    <div className="col-md-6">
                        <h2>{props.name}</h2>
                        <span>{props.description}</span>
                        <Link to={props.link}><button className="btn btn-default btn-launch">Lancer le service</button></Link>
                    </div>
                    <div className="col-md-6">
                        <img src={props.img} alt=""/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default withRouter(DetailL);
