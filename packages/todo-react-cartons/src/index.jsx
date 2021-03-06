import ReactDOM, { render } from 'react-dom';
import * as React from 'react';
import { descriptors } from 'cartons/helpers';


import './css/base.css';
import './css/app.css';

import TodoCollection from './models/todo-collection';

import Todos from './components/todos';
import TodoInput from './components/todo-input';
import Footer from './components/footer';

import {
  removeTodo,
  goFilterTodos,
  toggleAllCompleted,
  clearAllCompleted,
  addTodo
} from './actions';


const { bindActions } = descriptors;

class App extends React.Component {
  todos = bindActions({
      actionsAttributeName: 'actions'
    })({
      goFilterTodos,
      addTodo,
      removeTodo,
      toggleAllCompleted,
      clearAllCompleted
    })(new TodoCollection());

  render () {
    const todos = this.todos;
    return (
      <div
        className="todoapp"
      >
        <TodoInput
          todos={todos}
        />
        <Todos
          todos={todos}
        />
        <Footer
          todos={todos}
        />
      </div>
    )
  }
}

render((<App />), document.getElementById('application'));
