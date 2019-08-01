const eventsDefault = [];

export default (state = eventsDefault, action) => {
    let events = [];
    switch (action.type) {
        case 'SET_EVENTS':
            return action.events;
        case 'UPDATE_EVENT':
            events = state.map((item, index) => {
                item.id === action.event.id && (item = action.event);
                return item;
            });
            return events;
        case 'ADD_EVENT':
            return [...state, action.event];
        case 'DELETE_EVENT':
            events = state.filter((item, index) => {
                console.log(item.id, action.event.id);
                return item.id !== action.event.id;
            });
            console.log(events);
            return events;
        default:
            return state;
    }
}