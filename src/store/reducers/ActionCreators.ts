import axios from 'axios';
import { AppDispatch } from '../store';
import { IUser } from '../../models/IUser';
// import { usersSlice } from './UsersSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { resourceLimits } from 'worker_threads';

// common redux action creator
// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(userSlice.actions.usersFetching());
//     const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
//     dispatch(userSlice.actions.usersFetchingSucccess(response.data));
//   } catch(e: any) {
//     dispatch(userSlice.actions.usersFetchingError(e.message));
//   }
// }

// redux toolkit action creator
export const fetchUsers = createAsyncThunk(
  'user/fetchAll',
  async (reqParams: any = {limit: 3, page: 1}, thunkAPI) => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users', {
          params: {
            _limit: reqParams.limit,
            _page: reqParams.page
          }
        }
      );
      return {data: response.data, headers: response.headers};
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'user/fetchOneUser',
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.get<IUser[]>(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);