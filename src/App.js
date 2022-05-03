import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import WelcomeScreen from './WelcomeScreen';
import { WarningAlert } from './Alert';
// import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Sector, Cell } from 'recharts';
// import { mockData } from './mock-data';
// import EventGenre from './EventGenre';

class App extends Component {
  state = {
    events: [],
    locations: [],
    currentLocation: 'all',
    numberOfEvents: 32,
    showWelcomeScreen: undefined,
    warningText: ''
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
    if (!navigator.onLine) {
      this.setState({
        warningText: 'Please connect to the internet'
      });
    } else {
      this.setState({
        warningText: ''
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateNumberOfEvents = (numberOfEvents) => {
    this.setState(
      {
        numberOfEvents,
      },
      this.updateEvents(this.state.locations, numberOfEvents)
    );
  };

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, this.state.numberOfEvents),
          currentLocation: location,
        });
      }
    });
  };

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
    const { numberOfEvents, locations, events, warningText } = this.state;

    return (
      <div className="App">
        <CitySearch locations={locations} updateEvents={this.updateEvents} /> <br>
        </br>
        <NumberOfEvents numberOfEvents={numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents} />
        <EventList events={events} />
        <WarningAlert text={warningText} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;













// // src/App.js
// import './nprogress.css';
// import React, { Component } from 'react';
// import './App.css';
// import EventList from './EventList';
// import CitySearch from './CitySearch';
// import NumberOfEvents from './NumberOfEvents';
// import WelcomeScreen from './WelcomeScreen';
// import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
// import { WarningAlert } from './Alert';


// class App extends Component {
//   state = {
//     events: [],
//     locations: [],
//     numberOfEvents: 32,
//     showWelcomeScreen: undefined,
//     warningText: "",
//   }

//   async componentDidMount() {
//     this.mounted = true;

//     const accessToken = localStorage.getItem('access_token');
//     const isTokenValid = (await checkToken(accessToken)).error ? false :
//       true;
//     const searchParams = new URLSearchParams(window.location.search);
//     const code = searchParams.get("code");
//     this.setState({ showWelcomeScreen: !(code || isTokenValid) });
//     if ((code || isTokenValid) && this.mounted) {
//       getEvents().then((events) => {
//         if (this.mounted) {
//           this.setState({ events, locations: extractLocations(events) });
//         }
//       });
//     }
  
//     getEvents().then((events) => {
//       if (this.mounted) {
//         this.setState({
//           events: events.slice(0, this.state.numberOfEvents),
//           locations: extractLocations(events),
//         });
//       }
//     });
//   }

 


//   componentWillUnmount(){
//     this.mounted = false;
//   }
//   updateEvents = (location, eventCount = this.state.numberOfEvents) => {
//     getEvents().then((events) => {
//       const locationEvents = (location === 'all') ?
//         events :
//         events.filter((event) => event.location === location);
//       if (this.mounted) {
//           this.setState({
//             events: locationEvents.slice(0, eventCount),
//             currentLocation: location,
//           });
//         }
//       });
//     };
//     updateEventNumbers = (eventCount) => {
//       this.setState({
//         numberOfEvents: eventCount,
//       });
//       this.updateEvents(this.state.currentLocation, eventCount);
//     };
     
//   render() {
//     if (this.state.showWelcomeScreen === undefined) return <div className="App"/>

//     return (
//       <div className="App">
//         <WarningAlert id='warningAlert' text={this.state.warningText} />
//         <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
//         <NumberOfEvents numberOfEvents={this.state.numberOfEvents} 
//           updateNumberOfEvents={this.updateNumberOfEvents} />
//         <EventList events={this.state.events} NumberOfEvents={this.state.numberOfEvents}/>

//         <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
//           getAccessToken={() => { getAccessToken() }} />

//       </div>
//     );
//   }
// }

// export default App;