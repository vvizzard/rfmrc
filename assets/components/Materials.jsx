import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"
import { FormattedMessage } from "react-intl"

function Materials(props) {
    const materials = [];
    materials.push(
        <div key={1} className="col-sm-4 material">
            <div className="material-content">
                <a href="https://www.worldwetlandsday.org/image/journal/article?img_id=551292&t=1574756449462">
                    <img src="https://www.worldwetlandsday.org/image/journal/article?img_id=551292&t=1574756449462" alt=""/>
                </a>
            </div>
        </div>
    );
    materials.push(
        <div key={2} className="col-sm-4 material">
            <div className="material-content">
                <a href="https://www.worldwetlandsday.org/image/journal/article?img_id=551294&t=1574756449535">
                    <img src="https://www.worldwetlandsday.org/image/journal/article?img_id=551294&t=1574756449535" alt=""/>
                </a>
            </div>
        </div>
    );
    materials.push(
        <div key={3} className="col-sm-4 material">
            <div className="material-content">
                <a href="https://www.worldwetlandsday.org/image/journal/article?img_id=551292&t=1574756449462">
                    <img src="https://www.worldwetlandsday.org/image/journal/article?img_id=551292&t=1574756449462" alt=""/>
                </a>
            </div>
        </div>
    );
    materials.push(
        <div key={4} className="col-sm-4 material">
            <div className="material-content">
                <a href="https://www.worldwetlandsday.org/image/journal/article?img_id=551294&t=1574756449535">
                    <img src="https://www.worldwetlandsday.org/image/journal/article?img_id=551294&t=1574756449535" alt=""/>
                </a>
            </div>
        </div>
    );

    return (
        <div>
            <h1>
                <FormattedMessage
                    id="globale_materiel"
                    defaultMessage="Matériels"
                />
            </h1><br/>
            <p>Nos matériels pour soutenir nos activités</p><br/>
            <div className="row">
                {materials}
            </div>
        </div>
    )
}

export default withRouter(Materials);
