import React from 'react';
import EventEdit from './EventEdit';

class EventView extends React.Component {
    state = {
        eventEdit: false
    }

    handleEventEditView = (e) => {
        this.setState({
            eventEdit: !this.state.eventEdit
        });
    }

    render() {
        if (this.state.eventEdit) {
            return (
                <EventEdit selectedDate={this.props.selectedDate} handleEventEditView={this.handleEventEditView} event={this.props.event} />
            );
        }
        else {
            return (
                <div className="content-container listItem" style={{ "background": this.props.event.color }}>
                    <div className="eventItemHeader"><span>{this.props.event.description}</span></div>
                    <div><span>{`${this.props.event.time}`}</span></div>
                    <div className="flexJustifySpaceBtw">
                        <button className="button" onClick={this.handleEventEditView}>Edit</button>
                        <button className="button" onClick={(e) => this.props.handleEventDelete(this.props.event)}>Delete</button>
                    </div>
                </div>
            );
        }

    }
}

export default EventView;