// 1. 创建store对象 存储默认状态0
// 2. 将store对象放在一个全局的 组件可以够的到的地方
// 3. 让组件获取store对象中的状态 并将状态显示在组件中
import { observable, configure, action, runInAction, flow, computed, autorun } from 'mobx';
import axios from 'axios';

// 通过配置强制程序使用action函数更改应用程序中的状态
configure({enforceActions: 'observed'});

class CounterStore {

  constructor () {
    autorun (() => {
      try {
        uniqueUsername(this.username)
        console.log('用户名可用')
      }catch (e) {
        console.log(e.message)
      }
    }, {
      delay: 2000
    })
  }

  @observable count = 0;
  @observable users = [];
  @observable username = '';

  // @action increment = () => {
  //   this.count = this.count + 1;
  // }

  // @action decrement = () => {
  //   this.count = this.count - 1;
  // }

  @action.bound increment () {
    this.count = this.count + 1;
  }

  @action.bound decrement () {
    this.count = this.count - 1;
  }
  // @action.bound async getData () {
  //   let { data } = await axios.get('https://api.github.com/users');
  //   runInAction(() => this.users = data);
  // }

  // getData = flow(function* () {
  //   let { data } = yield axios.get('https://api.github.com/users');
  //   this.users = data
  // }).bind(this)

  @computed get getResult () {
    return this.count * 10
  }

  @action.bound changeUsername (username) {
    this.username = username;
  }
}

const counter = new CounterStore();

function uniqueUsername (username) {
  return new Promise((resolve, reject) => {
    if (username === 'admin') {
      reject('用户名已经存在')
    }else {
      resolve()
    }
  })
}

export default counter;