import React, { Component } from 'react';

class Event extends Component {
    state = {
        collapsed: true
    }

    render () {

        const { event } = this.props;

        return <div className='event'>
            <button className='show-details'>Show details</button>
            <button className='hide-details'>Hide details</button>
            <p className='location'>{event.location}</p>
            <p className='start-date'>{event.start.dateTime} {event.start.timeZone}</p>
        </div>;
    }
}

export default Event;