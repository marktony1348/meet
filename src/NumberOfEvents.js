import React, { Component } from 'react';

import { ErrorAlert } from './Alert';


class NumberOfEvents extends Component {


    render() {
        const { numberOfEvents, updateNumberOfEvents } = this.props
        return (
            <div className="number-events-wrapper">
                <p>Number of events:</p>
                <input
                    className="number-events"
                    type="number"
                    value={numberOfEvents}
                    onChange={(e) => updateNumberOfEvents(e.target.value)} />

            </div>
        )
    }
}

export default NumberOfEvents;

