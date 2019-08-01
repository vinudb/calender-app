import React from 'react';
import moment from 'moment';
import CalenderHeader from './CalenderHeader';
import CalenderDays from './CalenderDays';
import CalenderCells from './CalenderCells';
import EventList from './EventList';
import { startSetEvents } from '../actions/events';
import { connect } from 'react-redux';

class Calender extends React.Component {
    state = {
        currentMonth: moment(),
        selectedDate: moment(),
        currentYear: moment().format("Y"),
        eventView: false
    };

    //handle when user clicks on next month arrow in the header
    nextMonth = () => {
        this.setState((prevState) => {
            return {
                currentMonth: moment(this.state.currentMonth).add(1, 'months'),
                currentYear: parseInt(prevState.currentMonth.format("M")) === 12 ? moment(prevState.currentYear).add(1, 'years').format("Y") : prevState.currentYear
            }
        }, () => { this.props.startSetEvents(this.state.currentMonth.format("MM"), true); });
    };

    //handle when user clicks on prev month arrow in the header
    prevMonth = () => {
        this.setState((prevState) => {
            return {
                currentMonth: moment(this.state.currentMonth).subtract(1, 'months'),
                currentYear: parseInt(prevState.currentMonth.format("M")) === 1 ? moment(prevState.currentYear).subtract(1, 'years').format("Y") : prevState.currentYear
            }
        }, () => { this.props.startSetEvents(this.state.currentMonth.format("MM"), true); });
    };

    //when user clicks on a cell of a date, set the selected date state and move to event list view
    onDateClick = day => {
        this.setState({
            selectedDate: day
        }, () => this.handleEventView());
    };

    handleEventView = () => {
        this.setState({
            eventView: !this.state.eventView
        });
    }

    render() {
        if (!this.state.eventView) {
            return (
                <div className="calendar">
                    <CalenderHeader
                        prevMonth={this.prevMonth}
                        nextMonth={this.nextMonth}
                        currentYear={this.state.currentYear}
                        currentMonth={this.state.currentMonth}
                    />
                    <CalenderDays />
                    <CalenderCells
                        currentMonth={this.state.currentMonth}
                        selectedDate={this.state.selectedDate}
                        currentDateMoment={this.state.selectedDate}
                        onDateClick={this.onDateClick}
                    />
                </div>
            );
        }
        else {
            return (
                <EventList handleEventView={this.handleEventView} selectedDate={this.state.selectedDate} />
            );
        }
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    startSetEvents: (month, isMonth) => dispatch(startSetEvents(month, isMonth))
});

export default connect(null, mapDispatchToProps)(Calender);