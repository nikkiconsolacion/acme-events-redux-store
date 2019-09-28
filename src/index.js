import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom';

import store, { addEvent, fetchEvents, deleteEvent } from './store';

const connect = (Component)=> {
  class Connected extends React.Component{
    constructor(){
      super();
      this.state = store.getState();
    }
    componentWillUnmount(){
      this.unsubscribe();
    }
    componentDidMount(){
      this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }
    render(){
      return (
        <Component {...this.state } {...this.props }/>
      );
    }
  }
  return Connected;
}

const Nav = connect(({ events})=> {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/events'>Events ({events.length})</Link>
    </nav>
  );
});

const Home = connect(({events})=> {
  return (
    <div>
      You have {events.length} events!
    </div>
  )
});

const Events = connect(({ events })=> {
  return (
    <div>
      <button onClick={ addEvent }>Create</button>
      <ul>
        {
          events.map( event => <li key={event.id} onClick={ ()=> deleteEvent(event.id)}>{ event.name}</li>)
        }
      </ul>
    </div>
  );
});

class App extends React.Component{
  componentDidMount(){
    fetchEvents();
  }
  render(){
    return(
      <HashRouter>
        <Route component={ Nav} />
        <Route exact path='/' component={ Home } />
        <Route path='/events' component={ Events } />
      </HashRouter>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
