import React from 'react';
import { startUpdateEvent } from '../actions/events';
import { connect } from 'react-redux';

class EventEdit extends React.Component {
    eventDefault = {
        id: undefined,
        date: this.props.selectedDate.format("DD"),
        month: this.props.selectedDate.format("MM"),
        year: this.props.selectedDate.format("YYYY"),
        time: "00:00",
        description: "",
        color: "Darkcyan"
    }

    hoursArray = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
    minutesArray = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
    colorsArray = ["Red", "Green", "Aqua", "Brown", "Darkcyan", "Deeppink"];

    state = {
        event: this.props.event ? this.props.event : this.eventDefault
    }

    onDescriptionChange = (e) => {
        if (e.target.value.length <= 30)
            this.setState({
                event: { ...this.state.event, description: e.target.value }
            })
    }

    onSaveClicked = (e) => {
        if (this.state.event.description.length === 0) {
            alert("Description cannot be empty");
            return;
        }
        //if ID is undefined, then create a new id and dispatch for saving in db and store
        if (this.state.event.id === undefined) {
            this.setState({
                event: { ...this.state.event, id: Math.random() }
            },
                //dispatch here
                () => {
                    this.props.startUpdateEvent(this.state.event, true);
                    this.props.handleEventEditView();
                }
            )
        }
        else {//editing existing event. dispatch to store in db and store. 
            this.props.startUpdateEvent(this.state.event, false);
            this.props.handleEventEditView();
        }
    }

    onHoursChange = (e) => {
        this.setState({
            event: { ...this.state.event, time: `${e.target.value}:${this.state.event.time.split(":")[1]}` }
        })
    }

    onMinutesChange = (e) => {
        this.setState({
            event: { ...this.state.event, time: `${this.state.event.time.split(":")[0]}:${e.target.value}` }
        })
    }

    onColorChange = (e) => {
        this.setState({
            event: { ...this.state.event, color: e.target.value }
        })
    }

    render() {
        return (
            <div>
                <input className="text-input" type="text"
                    value={this.state.event.description}
                    onChange={this.onDescriptionChange}
                    placeholder="Event Description"
                />
                <div className="eventEditTimeSelect">
                    <select className="select" onChange={this.onHoursChange}
                        value={this.state.event.time.split(":")[0]}>
                        {this.hoursArray.map((item) => {
                            return (
                                <option key={item} value={item}>{item}</option>
                            );
                        })}
                    </select>
                    <select className="select" onChange={this.onMinutesChange}
                        value={this.state.event.time.split(":")[1]}>
                        {this.minutesArray.map((item) => {
                            return (
                                <option key={item} value={item}>{item}</option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    <select className="select" onChange={this.onColorChange}
                        style={{
                            "background": this.state.event.color,
                            "color": "white"
                        }}
                        value={this.state.event.color}>
                        {this.colorsArray.map((item) => {
                            var divStyle = {
                                "background": item,
                                "color": "white"
                            };
                            return (
                                <option key={item} value={item} style={divStyle}>{item}</option>
                            );
                        })}
                    </select>
                </div>
                <div className="eventListFooterBtns">
                    <button className="button saveButton" onClick={(e) => { this.onSaveClicked(e) }}>Save</button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    startUpdateEvent: (event, isNew) => dispatch(startUpdateEvent(event, isNew))
});

export default connect(null, mapDispatchToProps)(EventEdit);