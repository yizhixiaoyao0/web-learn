export default store => next => action => {
  console.log(store);
  console.log(action);
  next(action);
}