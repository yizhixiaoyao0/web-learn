import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";

export default [{
  path: '/',
  component: HomePage,
  exact: true
}, {
  path: '/list',
  ...ListPage
}]