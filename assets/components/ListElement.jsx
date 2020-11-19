import React, { Component } from 'react'

function ListElement (props) {
    return (
        <div>
            <section className="row-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-1 row-block">
                            <ul id="sortable">
                                <li>
                                    <div className="media">
                                        <div className="media-body">
                                            <h4>{props.name}</h4>
                                            <p>{props.description}</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ListElement;