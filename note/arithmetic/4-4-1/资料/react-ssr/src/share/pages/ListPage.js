import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../store/actions/user.actions";
import { Helmet } from "react-helmet";

function ListPage({ user, dispatch }) {
  useEffect(() => {
    // 如果用户是通过客户端路由进入到当前页面 需要通过以下代码获取数据
    if (!window.INITIAL_STATE.user.length) dispatch(fetchUser());
  }, []);
  return (
    <>
      <Helmet>
        <title>List Page</title>
        <meta name="description" content="List Page description"></meta>
      </Helmet>
      <div>
        ListPage works
        <ul>
          {user.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

function loadData(store) {
  // dispatch 方法的返回值是要触发的 action 对象
  // 但现在通过使用 thunk 触发 action 时 返回的是异步函数 异步函数的返回值是promise 所以此处的返回值就是promise
  return store.dispatch(fetchUser());
}

const mapStateToProps = state => ({ user: state.user });

export default {
  component: connect(mapStateToProps)(ListPage),
  loadData
};
