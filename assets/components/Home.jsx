import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"
import Service from './Service'
import Materials from './Materials'
import Partners from './Partners'
import Footer from './Footer'
import { FormattedMessage } from "react-intl"
// import banniere from '../img/banniere.jpg'

export default class Home extends Component {
    render() {
        const services = [];
        services.push(<Service key={1} link={'/detail/1'} img={"https://servir.adpc.net/sites/default/files/public/styles/tool_teaser_thumbnail/public/tools/images/Eco_Dash.jpg?itok=qbbKIT5v"} name={"Fire alert system"} />)
        services.push(<Service key={2} link={'/detail/2'} img={"https://servir.adpc.net/sites/default/files/public/styles/tool_teaser_thumbnail/public/tools/images/Eco_Dash.jpg?itok=qbbKIT5v"} name={"Monthly fire monitoring"} />)
        services.push(<Service key={3} link={'/detail/3'} img={"https://servir.adpc.net/sites/default/files/public/styles/tool_teaser_thumbnail/public/tools/images/Eco_Dash.jpg?itok=qbbKIT5v"} name={"Annual fire monitoring"} />)
        services.push(<Service key={3} link={'/detail/3'} img={"https://servir.adpc.net/sites/default/files/public/styles/tool_teaser_thumbnail/public/tools/images/Eco_Dash.jpg?itok=qbbKIT5v"} name={"Fire management Alert"} />)

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
                            <h1>
                                <FormattedMessage
                                    id="globale_service"
                                    defaultMessage="Service"
                                />
                            </h1>
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
