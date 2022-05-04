import React from "react";
import { shallow } from "enzyme";

//components
import Event from '../Event';
import { mockData } from '../mock-data';


describe('<Event /> component', () => {
    let EventWrapper;

    beforeAll(() => {
        EventWrapper = shallow(<Event event={mockData[0]} />);
    });

    // Event details Collapsed

    test('renders event', () => {
        expect(EventWrapper.find('.event')).toHaveLength(1);
    });
    test('renders summary', () => {
        expect(EventWrapper.find('.summary')).toHaveLength(1);
    });
    test('renders start-time', () => {
        expect(EventWrapper.find('.start-time')).toHaveLength(1);
    });
    test('renders time-zone', () => {
        expect(EventWrapper.find('.time-zone')).toHaveLength(1);
    });
    test('renders button [Show event details]', () => {
        expect(EventWrapper.find('.btn-details')).toHaveLength(1);
    });
    test('renders description', () => {
        expect(EventWrapper.find('.event-description')).toHaveLength(0);
    });

    // [Show details] button on load

    test('Event state.collapsed is true on load', () => {
        expect(EventWrapper.state('collapsed')).toBe(true);
    });
    test('Event details button text to display [Show details] on load', () => {
        expect(EventWrapper.find('.btn-details').text()).toBe('Show details');
    });

    // Event details !Collapsed

    test('Event state.collapse is false when .btn-details is clicked', () => {
        EventWrapper.find('.btn-details').simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(false);
    });

    // User clicks [Show event details] button 

    test('Event details button text to display [Hide details] when .event-description expanded', () => {
        EventWrapper.setState({
            collapsed: true
        })
        EventWrapper.find('.btn-details').simulate('click');
        expect(EventWrapper.find('.btn-details').text()).toBe('Hide details');
    });

})