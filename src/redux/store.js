import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

const projectSlice = createSlice({
  name: 'projects',
  initialState: { projects: [] },
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
  },
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [] },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    projects: projectSlice.reducer,
    tasks: taskSlice.reducer,
  },
});
