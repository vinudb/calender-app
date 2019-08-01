import React from 'react';
import EventView from './EventView';
import EventEdit from './EventEdit';
import moment from 'moment';
import { connect } from 'react-redux';
import { startSetEvents, startDeleteEvent } from '../actions/events';


class EventList extends React.Component {
    state = {
        eventEdit: false
    }

    componentDidMount() {
        this.props.startSetEvents(this.props.selectedDate.format("DD"), false);
    }

    handleEventEditView = (e) => {
        this.setState({
            eventEdit: !this.state.eventEdit
        });
    }

    handleEventDelete = (event) => {
        this.props.startDeleteEvent(event);
    }

    render() {

        if (this.state.eventEdit) {
            return (
                <div className="content-container">
                    <h2>Add an event</h2>
                    <EventEdit handleEventEditView={this.handleEventEditView} selectedDate={this.props.selectedDate} />
                </div>
            );
        }
        else {
            return (
                <div>
                    {this.props.events.length > 0 ?
                        <div className="content-container">
                            <h2>{`Events on ${this.props.selectedDate.format("DD-MM-YYYY")}`}</h2>
                            {this.props.events.map((event) => {
                                return (
                                    <EventView selectedDate={this.props.selectedDate} event={event} key={event.id} handleEventDelete={this.handleEventDelete} />
                                );
                            })}

                        </div>
                        :
                        <div>
                            No event created yet
                    </div>
                    }
                    <div className="eventListFooterBtns">
                        <button className="button" onClick={this.props.handleEventView}>Close</button>
                        <button className="button" onClick={this.handleEventEditView}>Add Event</button>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    events: state
});

const mapDispatchToProps = (dispatch, props) => ({
    startSetEvents: (date, isMonth) => dispatch(startSetEvents(date, isMonth)),
    startDeleteEvent: (event) => dispatch(startDeleteEvent(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);