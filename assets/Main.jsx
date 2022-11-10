import React, { Component, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Header,
  Home,
  Detail,
  Carte,
  EnCours,
  Sujets,
  About,
  CookiesConditions,
  CarteContainer,
} from "./components";
import { IntlProvider } from "react-intl";
import CookieConsent from "react-cookie-consent";
import Cookies from 'js-cookie';

import en from "./translation/en.json";
import fr from "./translation/fr.json";
import mg from "./translation/mg.json";

import axios from 'axios';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locale: "fr",
      langue: "fr",
      langueSelected: "fr",
      conditionUtilisationPopup: false,
      regionJson: null
    };

    this.setUpInternationalization();

    // this.handleClick = this.handleClick.bind(this);
    this.handleLanguageGot = this.handleLanguageGot.bind(this);
  }

  setUpInternationalization() {
    const language =
      (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      navigator.userLanguage;
    if (language) this.state.locale = language;

    const messages = { en, fr, mg };

    const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
    if (languageWithoutRegionCode)
      this.state.langueSelected = languageWithoutRegionCode;

    const message =
      messages[languageWithoutRegionCode] ||
      messages[language] ||
      messages["fr"];
    if (message) this.state.langue = message;
  }

  handleChange(event) {
    const messages = { en, fr, mg };
    this.setState({
      langue: messages[event.target.value],
      langueSelected: event.target.value,
    });
  }

  handleLanguageGot(lang) {
    if (lang && lang !== this.state.langueSelected) {
      const messages = { en, fr, mg };
      this.setState({
        langue: messages[lang],
        langueSelected: lang,
      });
      console.log("lang : " + lang);
    } else {
      console.log(lang ? lang : "tsisy lang");
    }
  }

  handleClick(e) {
    const messages = { en, fr, mg };
    this.setState({
      langue: messages[e.target.value],
      langueSelected: e.target.value,
    });
  }

  closeModal() {
    this.setState({
      conditionUtilisationPopup: false,
    });
  }

  componentDidMount() {
    this.setState({
      conditionUtilisationPopup: true,
      regionJson: this.getRegions()
    });
  }

  async getRegions() {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://brouillon.llanddev.org/region.php'
      });
      return await Promise.resolve(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const histories = [];

    return (
      <IntlProvider locale={this.state.locale} messages={this.state.langue}>
        {/* <CookiesConditions closePopup={() => this.closeModal()} open={this.state.conditionUtilisationPopup} /> */}
        <Router>
          {/* <Header onChange = {() => this.handleChange(event)} selected = {this.state.langueSelected} /> */}
          <div className="">
            <Switch>
              <Route
                path="/"
                exact
                component={() => <CarteContainer regionJson={this.state.regionJson} active="1" region="1" 
                type="1" />}
              />
              <Route
                path="/madagascar"
                exact
                component={() => (
                  <CarteContainer
                    regionJson={this.state.regionJson}
                    getlang={this.handleLanguageGot}
                    active="1"
                    region="1"
                    type="1"
                  />
                )}
              />
              <Route
                path="/ea"
                exact
                component={() => (
                  <CarteContainer
                    regionJson={this.state.regionJson}
                    getlang={this.handleLanguageGot}
                    active="1"
                    region="2"
                    type="1"
                  />
                )}
              />
              <Route
                path="/one_day_forecast_madagascar"
                exact
                component={() => (
                  <CarteContainer
                    regionJson={this.state.regionJson}
                    getlang={this.handleLanguageGot}
                    active="1"
                    region="1"
                    type="1"
                  />
                )}
              />
              <Route
                path="/one_day_forecast_ea"
                exact
                component={() => (
                  <CarteContainer
                    regionJson={this.state.regionJson}
                    getlang={this.handleLanguageGot}
                    active="1"
                    region="2"
                    type="1"
                  />
                )}
              />
              <Route
                path="/active_fire_data_madagascar"
                exact
                component={() => (
                  <CarteContainer
                    regionJson={this.state.regionJson}
                    getlang={this.handleLanguageGot}
                    active="2"
                    region="1"
                    type="2"
                  />
                )}
              />
              <Route
                path="/active_fire_data_ea"
                exact
                component={() => (
                  <CarteContainer
                    regionJson={this.state.regionJson}
                    getlang={this.handleLanguageGot}
                    active="2"
                    region="2"
                    type="2"
                  />
                )}
              />
              <Route
                path="/mburned_area_madagascar"
                exact
                component={() => (
                  <CarteContainer
                    regionJson={this.state.regionJson}
                    getlang={this.handleLanguageGot}
                    active="3"
                    region="1"
                    type="3"
                  />
                )}
              />
              <Route
                path="/mburned_area_ea"
                exact
                component={() => (
                  <CarteContainer
                    regionJson={this.state.regionJson}
                    getlang={this.handleLanguageGot}
                    active="3"
                    region="2"
                    type="3"
                  />
                )}
              />
              <Route
                path="/aburned_area_madagascar"
                exact
                component={() => (
                  <CarteContainer
                    regionJson={this.state.regionJson}
                    getlang={this.handleLanguageGot}
                    active="4"
                    region="1"
                    type="4"
                  />
                )}
              />
              <Route
                path="/aburned_area_ea"
                exact
                component={() => (
                  <CarteContainer
                    regionJson={this.state.regionJson}
                    getlang={this.handleLanguageGot}
                    active="4"
                    region="2"
                    type="4"
                  />
                )}
              />
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
          Ce site web utilise googles analytics ainsi que certains cookies pour
          vous offrire la meilleur expérience de navigation possible.
          {/* <span style={{ fontSize: "10px" }}>This bit of text is smaller :O</span> */}
        </CookieConsent>
      </IntlProvider>
    );
  }
}

export default Main;
