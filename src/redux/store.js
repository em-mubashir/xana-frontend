import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// import rootReducer from "../redux";
import rootReducer from "../redux/index";

const store = () => {
  const middlewares = [thunk];
  const enhancers = composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, enhancers);
  return store;
};
export default store;
