import React, { Component } from 'react';
import AddTodo from './addTodo';
import TodoList from './todoList';
import TodoExtra from './todoExtra';

class App extends Component {
  render() {
    return <section className="todoapp">
      <AddTodo />
      <TodoList />
      <TodoExtra />
    </section>
  }
}

export default App;
