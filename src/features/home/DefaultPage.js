import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './redux/actions';
import Navbar from './Navbar';
import Card from './Card';
import Loader from './Loader';
import Moment from 'moment';
import InsetLists from './InsetLists';


export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    loading: true,
  }

  async getWeatherList() {
    const { weatherList } = this.props.home;
    await this.props.actions.getWeather();
    await this.props.actions.getCurrentWeather();

    if(this.props.weatherList !== null && this.props.currentWeather !== null) {
      this.setState({loading: false});
    }
  }

  convertKelvinToCelcius = (kelvin) => {
    return (kelvin - 273.15).toFixed(0);
  }

  get parseWeatherList() {
    const { weatherList } = this.props.home;
    let parsedWeatherList = [];
    let moment = require('moment');

    if(weatherList !== null) {
      weatherList.data.list.map( wl => {
        if(moment(wl.dt_txt).hours() === 12) {
          parsedWeatherList.push(wl);
        }
      })
    }
    console.log(parsedWeatherList);
    return parsedWeatherList;
  }

  componentDidMount() {
    this.getWeatherList();
  }

  componentDidUpdate() {
    // const { weatherList } = this.props.home;

    // if(this.props.weatherList !== null) {
    //   // this.setState({loading: false});
    //   console.log('loading = ' + this.state.loading);
    // }
  }

  render() {
    let parsedWeatherList = this.state.loading ? [] : this.parseWeatherList;
    console.log(parsedWeatherList);
    parsedWeatherList.map(wl => {
      console.log(wl)
    })
    let ayam = 'ayammmmm'
    // <div className="second-content">
    //             asdasd
    //             {parsedWeatherList.map(wl => {
    //               <div>asdasdas</div>
    //             })}
    //           </div>

    return (
      <div className="home-default-page">
        <Navbar/>
        <div className="content">
          {this.state.loading ? 
            <Loader/> :
            <Card currentWeather={this.props.home.currentWeather} state={this}/>
          }
          <hr className="special-line"/>
          {this.state.loading ?
            <Loader/> : 
            <div className="second-content">
              {parsedWeatherList.map((wl, i) =>
                <InsetLists key={i} weather={wl} state={this} />
              )}
            </div>
          }
        </div>
      </div>
    )
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);
