export default store => next => action => {
  const result = next(action);
};
