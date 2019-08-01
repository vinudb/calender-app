import React from 'react';
import moment from 'moment';

const defaultWeekdays = Array.apply(null, Array(7)).map(function (_, i) {
    return (
        <div className="col col-center" key={i}>
            <div className="hideForMobile" key={Math.random()}>
                {moment(i, 'e').startOf('week').isoWeekday(i + 1).format('dddd')}
            </div>
            <div className="hideForDesktop" key={Math.random()}>
                {moment(i, 'e').startOf('week').isoWeekday(i + 1).format('ddd')}
            </div>
        </div>
    )
});

const CalenderDays = () => {
    return (
        <div className="days row">{defaultWeekdays}</div>
    );
}

export default CalenderDays;