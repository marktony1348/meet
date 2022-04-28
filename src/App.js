// src/App.js
import './nprogress.css';
import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { WarningAlert } from './Alert';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    warningText: "",
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events), warningText:"" });
      } else {
        getEvents().then((events) => {
          if (this.mounted) {
            this.setState({events, locations: extractLocations(events), warningText:"Oops You are currently offline. Events cannot be loaded"});
          }
        })
      }
    });
  } 


  componentWillUnmount(){
    this.mounted = false;
  }
  
  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }
  render() {
    return (
      <div className="App"> 
         <WarningAlert id='warningAlert' text={this.state.warningText} />
         <EventList events={this.state.events} NumberOfEvents={this.state.numberOfEvents}/>
         <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
         <NumberOfEvents numberOfEvents={this.state.numberOfEvents} 
            updateNumberOfEvents={this.updateNumberOfEvents} />
      </div>
    );
  }
}

export default App;