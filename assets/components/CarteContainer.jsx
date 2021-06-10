import React, { createRef, Component } from 'react'
import { Link } from 'react-router-dom';
import Carte from './Carte'

export default class CarteContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      headerLink: null,
      appTitle: null,
      regionLink: null,
      appRegion: null,
      center: null,
      zoom: null
    }
  }

  componentDidMount() {
    this.prepare(this.props.active, this.props.region);
  }

  prepare(active, region) {
    var first=null;
    var second=null;
    var third=null;
    var fourth=null;

    var rfirst=null;
    var rsecond=null;

    var appActive='one_day_forecast';
    var regionActive='madagascar';

    if(active==1) {
      first=<span>1 Day Fire Danger Forecast</span>
      this.setState({
        appTitle: "1 Day Fire Danger Forecast",
      });
      appActive="one_day_forecast";
    } else if(active==2) {
      second=<span>Active Fire Data</span>
      this.setState({
        appTitle: "Active Fire Data",
      });
      appActive="active_fire_data";
    } else if(active==3) {
      third=<span>Monthly Burned Area Monitoring</span>
      this.setState({
        appTitle: "Monthly Burned Area Monitoring",
      });
      appActive="mburned_area";
    } else if(active==4) {
      fourth=<span>Annually Burned Area Monitoring</span>
      this.setState({
        appTitle: "Annual Burned Area Monitoring",
      });
      appActive="aburned_area";
    }
    if(region==1) {
      rfirst=<span>Madagascar</span>
      this.setState({
        appRegion: "Madagascar",
        center: [-18.91368, 47.53613],
        zoom: 6
      });
      regionActive="madagascar";
    } else if(region==2) {
      rsecond=<span>East-Africa</span>
      this.setState({
        appRegion: "East-Africa",
        center: [-6.82349, 39.26951],
        zoom: 5
      });
      regionActive="ea";
    }

    if(first==null) first=<Link className="btn btn-primary" to={"/one_day_forecast_"+regionActive}>1 Day Fire Danger Forecast</Link>;
    if(second==null) second=<Link className="btn btn-primary" to={"/active_fire_data_"+regionActive}>Active Fire Data</Link>;
    if(third==null) third=<Link className="btn btn-primary" to={"/mburned_area_"+regionActive}>Monthly Burned Area Monitoring</Link>;
    if(fourth==null) fourth=<Link className="btn btn-primary" to={"/aburned_area_"+regionActive}>Annually Burned Area Monitoring</Link>;
    if(rfirst==null) rfirst = <Link className="btn btn-primary" to={"/"+appActive+"_madagascar"}>Madagascar</Link>;
    if(rsecond==null) rsecond = <Link className="btn btn-primary" to={"/"+appActive+"_ea"}>East-Africa</Link>;
    
    this.setState({
      headerLink: <div className="centered p">
        {first} &nbsp;| &nbsp; {second} &nbsp;| &nbsp; {third}&nbsp; | &nbsp; {fourth}
      </div>,
      regionLink: <div className="centered p">
        {rfirst} &nbsp;| &nbsp; {rsecond}
      </div>
    });
  }

  handleMapMouseOut(index) {
    const element = this.state.regionLayerReferences[index];
    const layer = element.current.leafletElement;

    if(!this.state.focused || this.state.focusedRegionIndex != index) {
      layer.setStyle({
        color: '#4a83ec',
        weight: 0.25,
        fillColor: "#1a1d62",
        fillOpacity: 0,
      });
    }
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
          name:"Carte",
          hide:"hidden"
      }
    ];

    return (
      <div className="entry-content-wrapper clearfix standard-content">
        <header className="entry-content-header">
          <h1 className="post-title entry-title">	
            <a href="#" rel="bookmark" title="Permanent Link: Global Fire Early Warning System">
                REGIONAL EAST AFRICA FIRE MANAGEMENT RESOURCE CENTER
            </a>
          </h1>
          <span className="av-vertical-delimiter"></span>
          <div className="entry-content">
            <div className="pf-content">

              {this.state.headerLink}

              <h3 className="centered">
                <strong>{this.state.appTitle}</strong>
              </h3>
              <div className="centered p">
                {this.state.regionLink}
              </div>
              
              <div className="centered p">
                <strong>
                  <span>Note: Beta version map, for any suggestion, please send your comments at <a id="mailto" href="mailto:lab_llanddev@moov.mg">lab_llanddev@moov.mg</a>
                  </span>
                </strong>
              </div>

              <h2 className="centered">{this.state.appRegion}</h2>
              <div>
                <Carte center={this.state.center} zoom={this.state.zoom} />
              </div>
                                                
              <section className="av_textblock_section ">
                <div className="avia_textblock  ">
                  <h3></h3>
                  {/* <h3>Partners</h3> */}
                  <div className="partners">
                    <div className="component partners">
                      <div className="grid-item">
                        <a href="https://gfmc.online/eurofire/covid19.html">
                            <img src="https://brouillon.llanddev.org/img/logo_medd.jpg" alt="logo"/>
                        </a>
                      </div>
                      <div className="grid-item">
                        <a href="https://gfmc.online/eurofire/covid19.html">
                          <img src="https://gfmc.online/wp-content/uploads/gfmc_logo_2020_2.png" alt="logo"/>
                        </a>
                      </div>
                      <div className="grid-item">
                        <a href="https://gfmc.online/manag/cbifm.html">
                          <img src="https://brouillon.llanddev.org/img/logo_giz.png" alt="logo"/>
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