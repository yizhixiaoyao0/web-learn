import axios from "axios";

export const FETCH_USER = "fetch_user";

export const fetchUser = () => async dispatch => {
  let response = await axios.get("https://jsonplaceholder.typicode.com/users");
  // let response = {
  //   data: [
  //     {
  //       id: 1,
  //       name: "</script><script>alert(1)</script>"
  //     }
  //   ]
  // };
  dispatch({
    type: FETCH_USER,
    payload: response
  });
};
