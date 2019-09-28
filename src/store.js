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
    else if (action.type === 'DELETE_EVENT'){
      state = [...state].filter(event => event.id !== action.id);
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

const deleteEvent = async(id)=> {
  await axios.delete(`/api/events/${id}`);
  store.dispatch({ type: 'DELETE_EVENT', id})
};


const store = createStore(reducer);

export default store;

export { fetchEvents, addEvent, deleteEvent };
