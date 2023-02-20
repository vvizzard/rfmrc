import React, { createRef, Component } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Carte from "./Carte";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";

class CarteContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerLink: null,
      appTitle: null,
      regionLink: null,
      appRegion: null,
      center: null,
      zoom: null,
      description: "",
      regionActive: "madagascar"
    };
  }

  componentDidMount() {
    this.prepare(this.props.active, this.props.region);
    this.getLanguage();
  }

  getLanguage() {
    const params = queryString.parse(location.search);
    const langueEnCours = params.lang;
    console.log(langueEnCours);
    this.props.getlang(langueEnCours);
  }

  prepare(active, region) {
    var first = null;
    var second = null;
    var third = null;
    var fourth = null;

    var rfirst = null;
    var rsecond = null;

    var appActive = "one_day_forecast";
    this.setState({regionActive : "madagascar"});

    if (active == 1) {
      first = (
        <span>
          <FormattedMessage id="forecast" />
        </span>
      );
      this.setState({
        appTitle: <FormattedMessage id="forecast" />,
        description: (
          <div className="desc">
            <h3><FormattedMessage id="methodology" /></h3>
            <p><FormattedMessage id="fcm1" /></p>
            <div className="graph">
              <img src="https://brouillon.llanddev.org/img/fwi_structure.gif" />
            </div>
            <p><FormattedMessage id="fcm2" /></p>
          </div>
        ),
      });
      appActive = "one_day_forecast";
    } else if (active == 2) {
      second = <span><FormattedMessage id="active_fire" /></span>;
      this.setState({
        appTitle: <FormattedMessage id="active_fire" />,
        description: (
          <div className="desc">
            <p><FormattedMessage id="afdesc" /></p>
            <ul>
              <li><FormattedMessage id="afli1" /></li>
              <li><FormattedMessage id="afli2" /></li>
            </ul>
            <h3><FormattedMessage id="modis.title" /></h3>
            <p><FormattedMessage id="modis.p1" /></p>
            <p><FormattedMessage id="modis.p2" /></p>
            <p><FormattedMessage id="modis.p3" /> <a href="https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/c6-mcd14dl">https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/c6-mcd14dl</a></p>
            <h3><FormattedMessage id="viirs.title" /></h3>
            <p><FormattedMessage id="viirs.p1" /></p>
            <p><FormattedMessage id="viirs.p2" /></p>
            <p><FormattedMessage id="viirs.p3" /> <a href="https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/viirs-i-band-active-fire-data">https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/viirs-i-band-active-fire-data</a></p>
          </div>
        ),
      });
      appActive = "active_fire_data";
    } else if (active == 3) {
      third = <span><FormattedMessage id="monthba" /></span>;
      this.setState({
        appTitle: <FormattedMessage id="monthba" />,
        description: (
          <div className="desc">
            <h3><FormattedMessage id="methodology" /></h3>
            <p>
              <FormattedMessage id="meth1" />
            </p>

            <div className="formule">
              <img src="https://brouillon.llanddev.org/img/nbr.png" />
              <img src="https://brouillon.llanddev.org/img/bais2.png" />
            </div>

            <p><FormattedMessage id="meth1l1" /></p>
            <p><FormattedMessage id="meth1l2" /></p>
            <p><FormattedMessage id="meth1l3" /></p>
            <p><FormattedMessage id="meth1l4" /></p>
            <p><FormattedMessage id="meth1l5" /></p>
            <p><FormattedMessage id="meth1l6" /></p>
            <p><FormattedMessage id="meth1l7" /></p>
            <p><FormattedMessage id="meth1l8" /></p>

            <h3><FormattedMessage id="def" /></h3>
            <ul>
              <li><FormattedMessage id="def1" /></li>
              <li><FormattedMessage id="def2" /></li>
              <li><FormattedMessage id="def3" /></li>
              <li><FormattedMessage id="def4" /></li>
            </ul>
          </div>
        ),
      });
      appActive = "mburned_area";
    } else if (active == 4) {
      fourth = <span><FormattedMessage id="annualba" /></span>;
      this.setState({
        appTitle: <FormattedMessage id="annualba" />,
        description: (
          <div className="desc">
            <h3><FormattedMessage id="methodology" /></h3>
            <p>
              <FormattedMessage id="meth1" />
            </p>

            <div className="formule">
              <img src="https://brouillon.llanddev.org/img/nbr.png" />
              <img src="https://brouillon.llanddev.org/img/bais2.png" />
            </div>

            <p><FormattedMessage id="meth1l1" /></p>
            <p><FormattedMessage id="meth1l2" /></p>
            <p><FormattedMessage id="meth1l3" /></p>
            <p><FormattedMessage id="meth1l4" /></p>
            <p><FormattedMessage id="meth1l5" /></p>
            <p><FormattedMessage id="meth1l6" /></p>
            <p><FormattedMessage id="meth1l7" /></p>
            <p><FormattedMessage id="meth1l8" /></p>

            <h3><FormattedMessage id="def" /></h3>
            <ul>
              <li><FormattedMessage id="def1" /></li>
              <li><FormattedMessage id="def2" /></li>
              <li><FormattedMessage id="def3" /></li>
              <li><FormattedMessage id="def4" /></li>
            </ul>
          </div>
        ),
      });
      appActive = "aburned_area";
    }
    if (region == 1) {
      rfirst = <span><FormattedMessage id="madagascar" /></span>;
      this.setState({
        appRegion: "Madagascar",
        center: [-18.91368, 47.53613],
        zoom: 6,
      });
      this.setState({regionActive : "madagascar"});
    } else if (region == 2) {
      rsecond = <span><FormattedMessage id="ae" /></span>;
      this.setState({
        appRegion: "East-Africa",
        center: [-6.82349, 39.26951],
        zoom: 5,
      });
      this.setState({regionActive : "ea"});
    }

    if (first == null)
      first = (
        <Link
          className="btn btn-primary"
          to={"/one_day_forecast_" + this.state.regionActive}
        >
          <FormattedMessage id="forecast" />
        </Link>
      );
    if (second == null)
      second = (
        <Link
          className="btn btn-primary"
          to={"/active_fire_data_" + this.state.regionActive}
        >
          <FormattedMessage id="active_fire" />
        </Link>
      );
    if (third == null)
      third = (
        <Link className="btn btn-primary" to={"/mburned_area_" + this.state.regionActive}>
          <FormattedMessage id="monthba" />
        </Link>
      );
    if (fourth == null)
      fourth = (
        <Link className="btn btn-primary" to={"/aburned_area_" + this.state.regionActive}>
          <FormattedMessage id="annualba" />
        </Link>
      );
    if (rfirst == null)
      rfirst = (
        <Link className="btn btn-primary" to={"/" + appActive + "_madagascar"}>
          <FormattedMessage id="madagascar" />
        </Link>
      );
    if (rsecond == null)
      rsecond = (
        <Link className="btn btn-primary" to={"/" + appActive + "_ea"}>
          <FormattedMessage id="ae" />
        </Link>
      );

    this.setState({
      headerLink: (
        <div className="centered p">
          {first} &nbsp;| &nbsp; {second} &nbsp;| &nbsp; {third}&nbsp; | &nbsp;{" "}
          {fourth}
        </div>
      ),
      regionLink: (
        <div className="centered p">
          {rfirst} &nbsp;| &nbsp; {rsecond}
        </div>
      ),
    });
  }


  render() {
    const histories = [
      {
        classe: "",
        link: "/",
        name: "Accueil",
        hide: "",
      },
      {
        classe: "active",
        link: "#",
        name: "Carte",
        hide: "hidden",
      },
    ];

    return (
      <div className="entry-content-wrapper clearfix standard-content">
        <header className="entry-content-header">
          <h1 className="post-title entry-title">
            <a
              rel="bookmark"
              title="Permanent Link: Global Fire Early Warning System"
            >
              <FormattedMessage id="titre" />
            </a>
          </h1>
          <span className="av-vertical-delimiter"></span>
          <div className="entry-content">
            <div className="pf-content">
              {this.state.headerLink}

              <h3 className="centered">
                <strong>{this.state.appTitle}</strong>
              </h3>
              <div className="centered p">{this.state.regionLink}</div>

              <div className="centered p">
                <strong>
                  <span>
                  <FormattedMessage id="nb" />{" "}
                  <a id="mailto" href="mailto:fire.medd@environnement.mg?cc=lab_llanddev@moov.mg">fire.medd@environnement.mg</a>, cc: "lab_llanddev@moov.mg"
                  </span>
                </strong>
              </div>

              <h2 className="centered">{this.state.appRegion}</h2>
              <div>
                <Carte
                  regionJson={this.props.regionJson}
                  center={this.state.center}
                  zoom={this.state.zoom}
                  type={this.props.type}
                  region={this.state.regionActive}
                />
              </div>
              {this.state.description}
              <section className="av_textblock_section ">
                <div className="avia_textblock  ">
                  <h3></h3>
                  {/* <h3>Partners</h3> */}
                  <div className="partners">
                    <div className="component partners">
                      <div className="grid-item">
                        <a href="https://www.environnement.mg/">
                          <img
                            src="https://brouillon.llanddev.org/img/logo_medd.jpg"
                            alt="logo"
                          />
                        </a>
                      </div>
                      <div className="grid-item">
                        <a href="https://gfmc.online/eurofire/covid19.html">
                          <img
                            src="https://gfmc.online/wp-content/uploads/gfmc_logo_2020_2.png"
                            alt="logo"
                          />
                        </a>
                      </div>
                      <div className="grid-item">
                        <a href="https://www.giz.de/en/html/index.html">
                          <img
                            src="https://brouillon.llanddev.org/img/logo_giz.png"
                            alt="logo"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default withRouter(CarteContainer);
