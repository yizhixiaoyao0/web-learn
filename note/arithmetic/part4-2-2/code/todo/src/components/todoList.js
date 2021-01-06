import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("todo")
@observer
class TodoList extends Component {
  render() {
    const { todoDelete, changeCompleted, filterTodo } = this.props.todo;
    return (
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <ul className="todo-list">
          {filterTodo.map((todo, index) => {
            return (
              <li className={todo.isCompleted ? 'completed': ''} key={todo.taskName}>
                <div className="view">
                  <input onChange={event => changeCompleted(index, event.target.checked)} checked={todo.isCompleted} className="toggle" type="checkbox" />
                  <label>{todo.taskName}</label>
                  <button onClick={() => todoDelete(index)} className="destroy"></button>
                </div>
                <input className="edit" />
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default TodoList;
