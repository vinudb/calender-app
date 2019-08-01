let url = "http://localhost:3010/";

// SET_EVENTS
export const setEvents = (events) => ({
    type: 'SET_EVENTS',
    events
});

//Fetch all events from json file and dispatch action to save in redux store
//using same function below. Based on month flag decide to fetch events of whole month or that date only
export const startSetEvents = (param, month) => {
    let tempUrl = "";
    month ?
        tempUrl = `${url}events?month=${param}` :
        tempUrl = `${url}events?date=${param}`
    return (dispatch) => {
        return fetch(tempUrl)
            .then(resp => resp.json())
            .then(data => {
                let events = [];
                if (data.length > 0) {
                    events = data.map((event, index) => {
                        return (
                            event
                        );
                    });
                    events = events.sort((a, b) => {
                        return parseInt(a.time.split(":")[0]) > parseInt(b.time.split(":")[0]) ? 1 : -1;
                    });
                }
                dispatch(setEvents(events));
            })
    }
}

//UPDATE_EVENT
export const updateEvent = (event) => ({
    type: 'UPDATE_EVENT',
    event
});

//ADD_EVENT
export const addEvent = (event) => ({
    type: 'ADD_EVENT',
    event
});

//save the updated object of event into the json file using put method and dispatch action to update store.
export const startUpdateEvent = (event, isNew = false) => {
    const tempUrl = isNew ? `${url}events` : `${url}events/${event.id}`;
    return (dispatch, getState) => {
        return fetch(tempUrl, {
            method: isNew ? 'POST' : 'PUT',
            body: JSON.stringify(event),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(resp => resp.json())
            .then(data => {
                isNew ? dispatch(addEvent(data)) : dispatch(updateEvent(data));
            })
    }
}

//DELETE_EVENT
export const deleteEvent = (event) => ({
    type: 'DELETE_EVENT',
    event
});

//delete an event
export const startDeleteEvent = (event) => {
    const tempUrl = `${url}events/${event.id}`;
    return (dispatch, getState) => {
        return fetch(tempUrl, {
            method: 'DELETE',
            body: JSON.stringify(event),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(resp => {
                return resp.json()
            })
            .then(data => {
                dispatch(deleteEvent(event));
            })
    }
}