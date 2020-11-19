import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header, Home, Detail, Carte, EnCours, Sujets, About, CookiesConditions } from './components'
import { IntlProvider } from "react-intl";
import CookieConsent from "react-cookie-consent";

import en from "./translation/en.json"
import fr from "./translation/fr.json"
import mg from "./translation/mg.json"

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            locale: "fr",
            langue: "fr",
            langueSelected: "fr",
            conditionUtilisationPopup: false
        };

        this.setUpInternationalization();

        // this.handleClick = this.handleClick.bind(this);
    }

    setUpInternationalization() {
        const language =
            (navigator.languages && navigator.languages[0]) ||
            navigator.language ||
            navigator.userLanguage;
        if(language) this.state.locale = language;

        const messages = { en, fr, mg };
        
        const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
        if(languageWithoutRegionCode) this.state.langueSelected = languageWithoutRegionCode;

        const message =
            messages[languageWithoutRegionCode] ||
            messages[language] ||
            messages["fr"];
        if(message) this.state.langue = message;
    }

    handleChange(event) {
        const messages = { en, fr, mg };
        this.setState({
            langue : messages[event.target.value],
            langueSelected : event.target.value
        });
    }

    handleClick(e) {
        const messages = { en, fr, mg };
        this.setState({
            langue : messages[e.target.value],
            langueSelected : e.target.value
        });
    }

    closeModal() {
        this.setState({
            conditionUtilisationPopup : false
        });
    }

    componentDidMount() {
        this.setState({
            conditionUtilisationPopup : true
        });
    }

    render() {

        const histories = [];

        return (
            <IntlProvider locale={this.state.locale} messages={this.state.langue}>
                <CookiesConditions closePopup={() => this.closeModal()} open={this.state.conditionUtilisationPopup} />
                <Router>
                    <Header onChange = {() => this.handleChange(event)} selected = {this.state.langueSelected} />
                    <div className="">
                        <Switch>
                            <Route path="/" exact component={() => <Home onClick = {() => this.handleClick(event)} />} />
                            <Route path="/tableauDeBord" exact component={() => <EnCours onClick = {() => this.handleClick(event)} />} />
                            <Route path="/sujets" exact component={() => <Sujets onClick = {() => this.handleClick(event)} />} />
                            <Route path="/detail" exact component={() => <Detail onClick = {() => this.handleClick(event)} />} />
                            <Route path="/map" exact component={() => <Carte />} />
                            <Route path="/about" exact component={() => <About onClick = {() => this.handleClick(event)} />} />
                        </Switch>
                    </div>
                </Router>
                <CookieConsent
                    location="bottom"
                    buttonText="OK"
                    cookieName="cookieValide"
                    style={{ background: "#2B373B" }}
                    buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                    expires={150}
                >
                    Ce site web utilise googles analytics ainsi que certains cookies pour vous offrire la meilleur expérience de navigation possible.
                    {/* <span style={{ fontSize: "10px" }}>This bit of text is smaller :O</span> */}
                </CookieConsent>
            </IntlProvider>
        )
    }
}

export default Main;