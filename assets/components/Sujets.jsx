import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"
import History from './History'
import DetailL from './DetailL'
import DetailR from './DetailR'
import Partners from './Partners'
import Footer from './Footer'

class Sujets extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            expanded: false,
            first: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, velit magni alias quis ipsam beatae laudantium, ducimus illo adipisci reiciendis asperiores! Culpa repudiandae suscipit veritatis eum iste voluptatibus ducimus earum."
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const txt = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, velit magni alias quis ipsam beatae laudantium, ducimus illo adipisci reiciendis asperiores! Culpa repudiandae suscipit veritatis eum iste voluptatibus ducimus earum.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, velit magni alias quis ipsam beatae laudantium, ducimus illo adipisci reiciendis asperiores! Culpa repudiandae suscipit veritatis eum iste voluptatibus ducimus earum.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, velit magni alias quis ipsam beatae laudantium, ducimus illo adipisci reiciendis asperiores! Culpa repudiandae suscipit veritatis eum iste voluptatibus ducimus earum.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, velit magni alias quis ipsam beatae laudantium, ducimus illo adipisci reiciendis asperiores! Culpa repudiandae suscipit veritatis eum iste voluptatibus ducimus earum.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, velit magni alias quis ipsam beatae laudantium, ducimus illo adipisci reiciendis asperiores! Culpa repudiandae suscipit veritatis eum iste voluptatibus ducimus earum.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, velit magni alias quis ipsam beatae laudantium, ducimus illo adipisci reiciendis asperiores! Culpa repudiandae suscipit veritatis eum iste voluptatibus ducimus earum.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, velit magni alias quis ipsam beatae laudantium, ducimus illo adipisci reiciendis asperiores! Culpa repudiandae suscipit veritatis eum iste voluptatibus ducimus earum.";
        this.setState({
            expanded: !this.state.expanded,
            first: this.state.expanded ? txt.substring(0, 255) : txt
        });
    }

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
                name:"Sujets",
                hide:"hidden"
            }
        ];

        const plus = this.state.expanded ? " ... voir moins" : " ... voir plus";

        return (
            <div>
                <History link={histories} title="Sujets" />
                <div className="content titled-content">
                    <section className="sujets">
                        <div className="container white-bg disposition shadow">
                            <h1>Land</h1>
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="sujets-content">
                                        <a href="https://www.worldwetlandsday.org/image/journal/article?img_id=551294&t=1574756449535">
                                            <img src="https://www.worldwetlandsday.org/image/journal/article?img_id=551294&t=1574756449535" alt=""/>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="sujets-content">
                                        <a href="https://www.worldwetlandsday.org/image/journal/article?img_id=551294&t=1574756449535">
                                            <img src="https://www.worldwetlandsday.org/image/journal/article?img_id=551294&t=1574756449535" alt=""/>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="sujets-content">
                                        <a href="https://www.worldwetlandsday.org/image/journal/article?img_id=551294&t=1574756449535">
                                            <img src="https://www.worldwetlandsday.org/image/journal/article?img_id=551294&t=1574756449535" alt=""/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="sujets-description">
                                {this.state.first}
                                <a href="#" onClick={this.handleClick}>{plus}</a>
                            </div>
                            <h1>Landscape</h1>
                            <div className="sujets-description">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, velit magni alias quis ipsam beatae laudantium, ducimus illo adipisci reiciendis asperiores! Culpa repudiandae suscipit veritatis eum iste voluptatibus ducimus earum.
                            </div>
                            <h1>Development</h1>
                            <div className="sujets-description">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, velit magni alias quis ipsam beatae laudantium, ducimus illo adipisci reiciendis asperiores! Culpa repudiandae suscipit veritatis eum iste voluptatibus ducimus earum.
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

export default withRouter(Sujets);