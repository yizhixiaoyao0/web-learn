import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject('todo')
@observer
class AddTodo extends Component {
  // 添加任务
  addTodo (event) {
    const { todoAdd } = this.props.todo;
    // 判断用户敲击的是否是回车键
    if (event.key === 'Enter') {
      // 获取用户在文本框中输入的内容
      const taskName = event.target.value;
      // 判断用户在文本框中是否输入了内容
      if (taskName.trim().length === 0) {
        // 阻止程序向下执行
        return;
      }
      // 将任务添加到任务列表数组中
      todoAdd (taskName);
      // 清空文本框中的内容
      event.target.value = '';
    }

  }
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input onKeyUp={this.addTodo.bind(this)} className="new-todo" placeholder="What needs to be done?" />
      </header>
    );
  }
}

export default AddTodo;
