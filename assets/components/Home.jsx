import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"
import Service from './Service'
import Materials from './Materials'
import Partners from './Partners'
import Footer from './Footer'
// import banniere from '../img/banniere.jpg'

export default class Home extends Component {
    render() {
        const services = [];
        services.push(<Service key={1} link={'/detail'} img={"https://servir.adpc.net/sites/default/files/public/styles/tool_teaser_thumbnail/public/tools/images/Eco_Dash.jpg?itok=qbbKIT5v"} name={"Fire base"} />)
        services.push(<Service key={2} link={'/detail'} img={"https://servir.adpc.net/sites/default/files/public/styles/tool_teaser_thumbnail/public/tools/images/Eco_Dash.jpg?itok=qbbKIT5v"} name={"Fire base 1"} />)
        services.push(<Service key={3} link={'/detail'} img={"https://servir.adpc.net/sites/default/files/public/styles/tool_teaser_thumbnail/public/tools/images/Eco_Dash.jpg?itok=qbbKIT5v"} name={"Fire base 2"} />)

        return (
            <div>
                <div className="home-banniere">
                    {/* <img className="banniere" src={banniere} alt="Banniere"/> */}
                    <div className="banniere">
                        <div className="brown"></div>
                    </div>
                </div>
                <div className="content">
                    <section>
                        <div className="container white-bg disposition shadow">
                            <h1>Services</h1>
                            <div className="row">
                                {services}
                            </div>
                        </div>
                    </section>
                    <section className="section-bg">
                        <div className="section-bg-opacity">
                            <div className="container white-bg disposition shadow">
                                <Materials />
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container white-bg disposition shadow">
                            <Partners />
                        </div>
                    </section>
                    <Footer onClick={this.props.onClick} />
                </div>
            </div>
        )
    }
}
