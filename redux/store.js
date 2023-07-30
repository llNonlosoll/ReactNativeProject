import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { postsReducer } from "./posts/postsSlice";
import { authReducer } from "./auth/authSlice";

const persistConfigAuth = {
  key: "auth",
  storage: AsyncStorage,
};

const persistedAuthReducer = persistReducer(persistConfigAuth, authReducer);

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: persistedAuthReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// const clearAsyncStorage = async () => {
//   try {
//     await AsyncStorage.clear();
//     console.log("AsyncStorage cleared successfully.");
//   } catch (e) {
//     console.log("Error clearing AsyncStorage:", e);
//   }
// };

// clearAsyncStorage();
