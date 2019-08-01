import React from 'react';

class EventsInCells extends React.Component {
    render() {
        return (
            this.props.events.length > 0 ?
                <div className="calenderCellEvents">
                    {this.props.events.map((event, index) => {
                        if (index <= 2)
                            return (
                                <div
                                    style={{ "background": event.color }}
                                    key={event.id}
                                    className="cellEventSpan cellEventBackground">
                                    <span className="hideForMobile">{event.time} : </span>
                                    <span>
                                        {event.description}
                                    </span>
                                </div>

                            );
                    })
                    }
                    {this.props.events.length > 3 && <span className="cellEventSpan">& more</span>}
                </div>
                :
                <div></div>
        );
    }
}

export default EventsInCells;