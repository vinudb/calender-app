import React from 'react';
import moment from 'moment';

class CalenderHeader extends React.Component {
    render() {
        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.props.prevMonth}>
                        chevron_left
                </div>
                </div>
                <div className="col col-center">
                    <span>{moment(`${this.props.currentYear} ${this.props.currentMonth.format("M")}`).format('MMM YYYY')}</span>
                </div>
                <div className="col col-end" onClick={this.props.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        );
    }
}

export default CalenderHeader;