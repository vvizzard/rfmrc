import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

function History(props) {
    const histories = props.link.map((item, index) => 
        <div key={index} className="inline">
            <Link className={item.classe} to={item.link}>
                <h4 className={item.classe}>{item.name}</h4>
            </Link>
            <h4 className={item.hide} >
                <FontAwesomeIcon icon={faAngleRight} />
            </h4>
        </div>
    );

    return (
        <div className="history">
            <div className="container">
                <h1>{props.title}</h1>
                {histories}
            </div>
        </div>
    )
}

export default withRouter(History);
