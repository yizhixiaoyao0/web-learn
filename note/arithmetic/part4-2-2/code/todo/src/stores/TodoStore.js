import { observable, action, computed } from 'mobx';

class TodoStore {
  // todo 列表
  @observable todos = [];
  // 筛选条件
  @observable filter = 'All';
  // 添加任务
  @action.bound todoAdd (taskName) {
    this.todos.push({
      taskName,
      isCompleted: false
    })
  }
  // 删除任务
  @action.bound todoDelete (index) {
    this.todos.splice(index, 1);
  }
  // 更改任务的是否已完成状态
  @action.bound changeCompleted (index, flag) {
    this.todos[index].isCompleted = flag;
  }

  @computed get unfinishedTodoCount () {
    return this.todos.filter(todo => todo.isCompleted === false).length;
  }

  // 更改筛选条件
  @action.bound changeFilter (condition) {
    this.filter = condition;
  }

  // 监测筛选条件的变化 根据筛选条件对任务进行筛选
  @computed get filterTodo () {
    switch (this.filter) {
      case 'All':
        return this.todos;
      case 'Active':
        return this.todos.filter(todo => todo.isCompleted === false);
      case 'Completed':
        return this.todos.filter(todo => todo.isCompleted === true);
    }
  }
}

const todo = new TodoStore();

export default todo;