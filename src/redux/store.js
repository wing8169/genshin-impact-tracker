import { createStore } from "redux";
import { persistStore, persistReducer, createMigrate } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import reducers from "./reducers";

const MIGRATION_DEBUG = false;

const migrations = {
  2: (state) => {
    return { ...state };
  },
};

const persistConfig = {
  key: "root",
  version: 2,
  migrate: createMigrate(migrations, { debug: MIGRATION_DEBUG }),
  storage: localStorage,
  whitelist: ["authDetails", "data"], // which reducer want to store
};

const persistedReducers = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);
