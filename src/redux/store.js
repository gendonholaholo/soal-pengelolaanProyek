import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './projectSlice';
import taskReducer from './taskSlice';

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    tasks: taskReducer,
  },
});
