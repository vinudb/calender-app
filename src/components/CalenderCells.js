import React from 'react';
import moment from 'moment';
import EventsInCells from './EventsInCells';
import { connect } from 'react-redux';
import {startSetEvents} from '../actions/events';

class CalenderCells extends React.Component {
    componentDidMount(){
        this.props.startSetEvents(this.props.currentDateMoment.format("MM"), true);
    }

    render() {
        const { currentMonth, selectedDate, currentDateMoment } = this.props;
        const monthStart = moment(currentMonth.format("M")).startOf('month');
        const monthEnd = moment(monthStart).endOf('month');
        const startDate = moment(monthStart).startOf('week');
        const endDate = moment(monthEnd).endOf('week');
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = moment(day).format("D");
                const cloneDay = day;
                const eventsInDate = this.props.events.filter((event)=>{
                    return (event.date === day.format("DD")) && (event.month === day.format("MM"))
                });
                days.push(
                    <div
                        className="col cell"
                        className={`col cell ${
                            !moment(day).isSame(monthStart, 'month')
                                ? "disabled"
                                : (day.format("D") === currentMonth.format("D")
                                    && moment().month() === currentMonth.month()
                                )
                                    ? "selected"
                                    : ""
                            }`}
                        key={day}
                        onClick={() => this.props.onDateClick(currentMonth.date(cloneDay.format("D")))}
                    >
                        <span className="number">{formattedDate}</span>
                        {this.props.events.length >0 && 
                            <EventsInCells events={eventsInDate}/>}

                        <span className="bg">{formattedDate}</span>
                    </div>
                );
                day = moment(day).add(1, 'days');
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }

        return (
            <div className="body">{rows}</div>
        );
    }
}

const mapStateToProps = (state) => ({
    events: state
});

const mapDispatchToProps = (dispatch, props) => ({
    startSetEvents: (month, isMonth) => dispatch(startSetEvents(month, isMonth))
});


export default connect(mapStateToProps, mapDispatchToProps)(CalenderCells);