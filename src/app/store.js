import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import appSliceReducer from '../AppSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    app_slice: appSliceReducer
  },
});
