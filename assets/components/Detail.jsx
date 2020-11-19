import React, { Component } from 'react'
import History from './History'
import DetailL from './DetailL'
import DetailR from './DetailR'
import Partners from './Partners'
import Footer from './Footer'

export default class Detail extends Component {
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
                name:"Fire monitoring",
                hide:"hidden"
            }
        ];

        const prepApps = [
            {
                title: "Fire monitoring",
                name: "Eto no anaran'ilay apps kely",
                description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit modi nisi praesentium assumenda quis architecto fugit temporibus voluptas quia ipsa qui animi tempora similique impedit accusantium reiciendis, quisquam voluptate eum!",
                link: "/map",
                img: "https://servir.adpc.net/sites/default/files/public/styles/tool_teaser_thumbnail/public/tools/images/Eco_Dash.jpg?itok=qbbKIT5v"
            },
            {
                name: "Eto no anaran'ilay apps kely 2",
                description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit modi nisi praesentium assumenda quis architecto fugit temporibus voluptas quia ipsa qui animi tempora similique impedit accusantium reiciendis, quisquam voluptate eum!",
                link: "/map",
                img: "https://servir.adpc.net/sites/default/files/public/styles/tool_teaser_thumbnail/public/tools/images/Eco_Dash.jpg?itok=qbbKIT5v"
            },
            {
                name: "Eto no anaran'ilay apps kely 3",
                description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit modi nisi praesentium assumenda quis architecto fugit temporibus voluptas quia ipsa qui animi tempora similique impedit accusantium reiciendis, quisquam voluptate eum!",
                link: "/map",
                img: "https://servir.adpc.net/sites/default/files/public/styles/tool_teaser_thumbnail/public/tools/images/Eco_Dash.jpg?itok=qbbKIT5v"
            }
        ];

        const apps = [];
        for (let index = 0; index < prepApps.length; index++) {
            apps.push(
                index%2==0 ? <DetailL key={index} title={prepApps[index].title} name={prepApps[index].name} description={prepApps[index].description} link={prepApps[index].link} img={prepApps[index].img} /> : <DetailR key={index} name={prepApps[index].name} description={prepApps[index].description} link={prepApps[index].link} img={prepApps[index].img} />
            );
        }

        return (
            <div>
                <History link={histories} title="Description de l'outil" />
                <div className="content titled-content">
                    {apps}
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
