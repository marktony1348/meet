import React, { Component } from 'react';
import './App.css';
import './nprogress.css';

import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventList from './EventList';
import EventGenre from './EventGenre';
import { WarningAlert, ErrorAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

class App extends Component {

  state = {
    numberOfEvents: 32,
    events: [],
    locations: [],
    currentLocation: 'all',
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }


  componentWillUnmount() {
    this.mounted = false;
  }

  updateNumberOfEvents = (numberOfEvents) => {
    const value = numberOfEvents;

    if (value <= 0 || value > 32) {
      this.setState({
        numberOfEvents: "",
        infoText: "choose number 1 to 32",
      });
      console.log('this.setState:', this.setState.infoText);
    } else {
      this.setState({
        numberOfEvents: value,
        infoText: ""
      });
    }
    this.updateEvents(this.state.currentLocation, numberOfEvents);
  };

  updateEvents = (location = 'all') => {
    getEvents().then((events) => {
      const locationEvents = location === 'all'
        ? events : events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, this.state.numberOfEvents),
          currentLocation: location,
        });
      }
    });
  }

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })
    return data;
  };

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />

    // eslint-disable-next-line no-unused-vars
    let { numberOfEvents, infoText, events } = this.state;

    return (
      <div className="App">
        {!navigator.onLine ? <WarningAlert
          text='You are not connected to the internet.' /> :
          <WarningAlert
            text='' />
        }
        <h1 className="title">Meet Up</h1>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          numberOfEvents={numberOfEvents}
          updateNumberOfEvents={this.updateNumberOfEvents}
        />
        {infoText &&
          <ErrorAlert text={this.state.infoText} />
        }
        <div className="data-vis-wrapper">
          
          <EventGenre events={events} />
       
          <ResponsiveContainer height={400}>
            <ScatterChart margin={{
              top: 20, right: 20, bottom: 20, left: 20,
            }}
            >
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis allowDecimals={false} type="number" dataKey="number" name="number of events" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="A school" data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        {/* <h4>Events in each city</h4> */}
        <EventList events={this.state.events} />
        {/* <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} /> */}
      </div>
    );
  }
}

export default App;
