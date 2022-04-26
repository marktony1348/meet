import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32,
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        if (value < 1 || value > 32) {
          this.setState({
            message: "Enter number between 1 and 32",
          });
        } else {
          this.setState({
            numberOfEvents: value,
            message: "",
          });
        }
        // this.props.updateNumberOfEvents(event.target.value);
      };

    render () {

        return (
            <div className='numberOfEvents'>
                <input 
                type='number'
                className='inputNumberOfEvents'
                // onChange={this.handleInputOnChange}
                onChange={this.handleInputChanged}
                value={this.state.numberOfEvents}
                />
            </div>
        )
    }
}
export default NumberOfEvents;



// import React, { Component } from 'react';

// class NumberOfEvents extends Component {
//     state = {
//         numberOfEvents: 32,
//         eventCount: 32
//     }

//     handleInputOnChange = (eventCount) => {
//         this.props.updateEvents(eventCount)
//     }

//     render () {
//         const { eventCount } = this.state;

//         return (
//             <div className='numberOfEvents'>
//                 <input 
//                 type='number'
//                 className='inputNumberOfEvents'
//                 onChange={this.handleInputOnChange}
//                 value={eventCount}
//                 />
//             </div>
//         )
//     }
// }

// export default NumberOfEvents;