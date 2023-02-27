import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { IntlProvider } from "react-intl";
import CookieConsent from "react-cookie-consent";
import axios from "axios";

import { CarteContainer } from "./components";
import en from "./translation/en.json";
import fr from "./translation/fr.json";
import mg from "./translation/mg.json";

//   Singleton launche once and only once
const useSingleton = (callBack = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
};

export default function Main() {
  const [locale, setLocale] = useState("fr");
  const [langue, setLangue] = useState("fr");
  const [langueSelected, setLangueSelected] = useState("fr");
  const [conditionUtilisationPopup, setConditionUtilisationPopup] =
    useState(false);
  const [regionJson, setRegionJson] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);

  //   Singleton used as hack for constructor
  useSingleton(() => {
    setUpInternationalization();
  });

  useEffect(() => {
    setRegionJson(getRegions());
  }, []);

  //   Internationalisation
  function setUpInternationalization() {
    const language =
      (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      navigator.userLanguage;
    if (language) setLocale(language);

    const messages = { en, fr, mg };

    const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
    if (languageWithoutRegionCode) setLangueSelected(languageWithoutRegionCode);

    const message =
      messages[languageWithoutRegionCode] ||
      messages[language] ||
      messages["fr"];
    if (message) setLangue(message);
  }

  function handleLanguageGot(lang) {
    if (lang && lang !== langueSelected) {
      const messages = { en, fr, mg };
      setLangue(messages[lang]);
      setLangueSelected(lang);
      console.log("current language : " + lang);
    } else {
      console.log("current language : " + lang ? lang : "not selected");
    }
  }

  //   Region layers
  async function getRegions() {
    try {
      let layers = {}
      layers.madagascar = await axios({
        method: "get",
        url: "https://brouillon.llanddev.org/region.php",
      });
      // layers.Burundi = await axios({
      //   method: "get",
      //   url: "https://brouillon.llanddev.org/countryAfrica.php?pays=Burundi",
      // });
      // layers.Djibouti = await axios({
      //   method: "get",
      //   url: "https://brouillon.llanddev.org/countryAfrica.php?pays=Djibouti",
      // });
      layers.Erythree = await axios({
        method: "get",
        url: "https://brouillon.llanddev.org/countryAfrica.php?pays=Erythree",
      });
      layers.Ethiopie = await axios({
        method: "get",
        url: "https://brouillon.llanddev.org/countryAfrica.php?pays=Ethiopie",
      });
      layers.Kenya = await axios({
        method: "get",
        url: "https://brouillon.llanddev.org/countryAfrica.php?pays=Kenya",
      });
      // layers.Malawi = await axios({
      //   method: "get",
      //   url: "https://brouillon.llanddev.org/countryAfrica.php?pays=Malawi",
      // });
      // layers.Mozambique = await axios({
      //   method: "get",
      //   url: "https://brouillon.llanddev.org/countryAfrica.php?pays=Mozambique",
      // });
      layers.Ouganda = await axios({
        method: "get",
        url: "https://brouillon.llanddev.org/countryAfrica.php?pays=Ouganda",
      });
      // layers.Rwanda = await axios({
      //   method: "get",
      //   url: "https://brouillon.llanddev.org/countryAfrica.php?pays=Rwanda",
      // });
      layers.Somalie = await axios({
        method: "get",
        url: "https://brouillon.llanddev.org/countryAfrica.php?pays=Somalie",
      });
      // layers.Tanzanie = await axios({
      //   method: "get",
      //   url: "https://brouillon.llanddev.org/countryAfrica.php?pays=Tanzanie",
      // });
      // layers.Zambie = await axios({
      //   method: "get",
      //   url: "https://brouillon.llanddev.org/countryAfrica.php?pays=Zambie",
      // });
      // layers.Zimbabwe = await axios({
      //   method: "get",
      //   url: "https://brouillon.llanddev.org/countryAfrica.php?pays=Zimbabwe",
      // });
      return await Promise.resolve(layers);
    } catch (error) {
      console.log(error);
      // return await Promise.resolve(regionJson);
    }
  }

  return (
    <IntlProvider locale={locale} messages={langue}>
      <Router>
        <div className="">
          <Switch>
            <Route
              path="/"
              exact
              component={() => (
                <CarteContainer
                  regionJson={regionJson}
                  active="1"
                  region="1"
                  type="1"
                />
              )}
            />
            <Route
              path="/madagascar"
              exact
              component={() => (
                <CarteContainer
                  regionJson={regionJson}
                  getlang={handleLanguageGot}
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
                  regionJson={regionJson}
                  getlang={handleLanguageGot}
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
                  regionJson={regionJson}
                  getlang={handleLanguageGot}
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
                  regionJson={regionJson}
                  getlang={handleLanguageGot}
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
                  regionJson={regionJson}
                  getlang={handleLanguageGot}
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
                  regionJson={regionJson}
                  getlang={handleLanguageGot}
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
                  regionJson={regionJson}
                  getlang={handleLanguageGot}
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
                  regionJson={regionJson}
                  getlang={handleLanguageGot}
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
                  regionJson={regionJson}
                  getlang={handleLanguageGot}
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
                  regionJson={regionJson}
                  getlang={handleLanguageGot}
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
      </CookieConsent>
    </IntlProvider>
  );
}
