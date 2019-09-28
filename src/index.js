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

const Nav = connect(({ Home, Events})=> {
  return (
    <nav>

      <Link to='/events'>Events ()</Link>
    </nav>
  );
  //<Link to='/home'>Home</Link>
});

const Events = connect(({ events })=> {
  return (
    <div>
      <button onClick={ addEvent }>Create</button>
      <ul>
        {
          events.map( event => <li key={event.id}>{ event.name}</li>)
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
        <Route path='/events' component={ Events } />
      </HashRouter>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
