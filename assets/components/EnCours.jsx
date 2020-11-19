import React, { Component } from 'react'
import History from './History'
import Service from './Service'
import Partners from './Partners'
import Footer from './Footer'

export default class EnCours extends Component {

    render() {
        const histories = [
            {
                classe:"",
                link:"/",
                name:"Accueil",
                hide:""
            },
            {
                classe:"active",
                link:"#",
                name:"Tableau de bord",
                hide:"hidden"
            }
        ];

        const services = [];
        services.push(<Service key={1} link={'/map'} img={"https://servir.adpc.net/sites/default/files/public/styles/tool_teaser_thumbnail/public/tools/images/Eco_Dash.jpg?itok=qbbKIT5v"} name={"Fire base"} />)
        services.push(<Service key={2} link={'/map'} img={"https://servir.adpc.net/sites/default/files/public/styles/tool_teaser_thumbnail/public/tools/images/Eco_Dash.jpg?itok=qbbKIT5v"} name={"Fire base 1"} />)
        services.push(<Service key={3} link={'/map'} img={"https://servir.adpc.net/sites/default/files/public/styles/tool_teaser_thumbnail/public/tools/images/Eco_Dash.jpg?itok=qbbKIT5v"} name={"Fire base 2"} />)

        return (
            <div>
                <History link={histories} title="Tableau de bord" />
                <div className="content titled-content">
                    <section>
                        <div className="container white-bg disposition shadow">
                            <h1>En cours de développement</h1>
                            Les services suivant sont en cours de développement. Ils seront disponibles dès que possible.
                            <div className="row">
                                {services}
                            </div>
                        </div>
                    </section>
                    <section className="section-bg">
                        <div className="section-bg-opacity">
                            <div className="container white-bg disposition shadow">
                                <Partners />
                            </div>
                        </div>
                    </section>
                    <Footer onClick={this.props.onClick} />
                </div>
            </div>
        )
    }
}
