import app from "./http";
import renderer from "./renderer";
import createStore from "./createStore";
import { matchRoutes } from 'react-router-config';
import routes from '../share/routes';

app.get("*", async (req, res) => {
  const store = createStore();
  // 根据请求路径分析出要渲染的组件并获取到组件需要的数据
  const promises = matchRoutes(routes, req.path).map(({route}) => {
    if (route.loadData) route.loadData(store);
  });
  // 等待数据渲染完成并对客户端做出响应
  Promise.all(promises).then(() => res.send(renderer(req, store)))
});
