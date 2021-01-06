import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("todo")
@observer
class TodoExtra extends Component {
  render() {
    const { unfinishedTodoCount, changeFilter, filter } = this.props.todo;
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{unfinishedTodoCount}</strong> item left
        </span>
        <ul className="filters">
          <li>
            <button className={filter === 'All' ? 'selected': ''} onClick={() => changeFilter('All')}>All</button>
          </li>
          <li>
            <button className={filter === 'Active' ? 'selected': ''} onClick={() => changeFilter('Active')}>Active</button>
          </li>
          <li>
            <button className={filter === 'Completed' ? 'selected': ''} onClick={() => changeFilter('Completed')}>Completed</button>
          </li>
        </ul>

        <button className="clear-completed">Clear completed</button>
      </footer>
    );
  }
}

export default TodoExtra;
