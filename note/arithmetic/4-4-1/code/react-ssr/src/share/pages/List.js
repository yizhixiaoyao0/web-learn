import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../store/actions/user.action";

function List({ user, dispatch }) {
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <div>
      list page works
      <ul>
        {user.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

function loadData (store) {
  return store.dispatch(fetchUser())
}

const mapStateToProps = state => ({ user: state.user });

export default {
  component: connect(mapStateToProps)(List),
  loadData
}
