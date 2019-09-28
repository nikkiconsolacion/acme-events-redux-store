import { createStore, combineReducers } from 'redux';
import axios from 'axios';

const reducer = combineReducers({
  events: ( state = [], action)=> {
    if(action.type === 'ADD_EVENT'){
      state = [...state, action.event];
    }
    else if (action.type === 'SET_EVENTS'){
      state = action.events;
    }
    return state;
  }
});

const fetchEvents = async()=> {
  store.dispatch({ type: 'SET_EVENTS', events: (await axios.get('/api/events')).data});
};

const addEvent = async()=> {
  store.dispatch({ type: 'ADD_EVENT', event: (await axios.post('/api/events')).data});
};

const deleteEvent = async()=> {
  store.dispatch({ type: 'DELETE_EVENT', event: (await axios.delete('/api/events')).data})
};


const store = createStore(reducer);

export default store;

export { fetchEvents, addEvent, deleteEvent };
