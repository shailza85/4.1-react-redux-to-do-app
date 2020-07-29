import React from 'react';
import { addNewToDo,removeToDo } from './actions/todos';
import {connect} from 'react-redux';


class App extends React.Component {
  constructor ( props )
  {
    super( props );

    this.state = {
      newToDo: "", // Keep track of our new to-do value.
    };
  }



  // Add a new todo (see onSubmit in our form below.)
  addToDo = ( event ) =>
  {
    event.preventDefault(); // Stop the page from reloading.
    // console.log( "Test add todo!" ); // Test that we're submitting!

    // Dispatch an action; this one we set to require some "newtoDo" text.
    this.props.dispatch(addNewToDo(this.state.newToDo));
  }

  updateItem ( key, value )
  {
    // We never re-assign the contents of this.state.
    // this.state is ONLY USED FOR READING VALUES, NOT writing.
    // When we need to update anything in state, we need to use this.setState()
    // this.setState() triggers the render() method, so we can see updated state info in our presentation.
    this.setState( {[key]: value} );
  }

  removeToDo ( id )
  {
      //Using dispatch with or remove action. dispatch method is passing a function.
    this.props.dispatch(removeToDo(id));
  }

  render ()
  {
    return (
      <>
        <h1>React/Redux To-Do Application</h1>
        <form onSubmit={this.addToDo}>
            <label htmlFor="newToDo">
              Enter a new "To-Do":
              <input
                type="text"
                name="newToDo"
                id="newToDo"
                required
                value={this.state.newToDo}
                onChange={event => this.updateItem( 'newToDo', event.target.value )} />
            </label>
            <input type="submit" value="Add New To-Do" />
          </form>
          <h2>Current To-Dos:</h2>
          <ul>
            {this.props.toDos.map( toDo => ( // We can use .map() to "loop" through our array contents. Great for outputting something like these ToDos.
              <li key={toDo.uniqueId} onClick={() => {this.removeToDo( toDo.uniqueId )} }>
                {toDo.value}
              </li>
            ) )}
          </ul>
      </>
    );
  }
}

export default connect ( 
  state=>{return{toDos:state}},
  
)
(App); //Name of the component(i.e App)
