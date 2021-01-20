import Home from '../share/pages/Home';
import List from '../share/pages/List';

export default [{
  path: '/',
  component: Home,
  exact: true
}, {
  path: '/list',
  ...List
}]