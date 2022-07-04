import { IUser } from '../../models/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers } from './ActionCreators';

interface Responce {
  data: IUser[];
  headers: any;
}

interface UserState {
  resp: Responce;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  isLoading: false,
  error: '',
  resp: {data: [], headers: {}},
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // usersFetching(state) {
    //   state.isLoading = true;
    // },
    // usersFetchingSucccess(state, action: PayloadAction<IUser[]>) {
    //   state.isLoading = false;
    //   state.error = "";
    //   state.users = action.payload;
    // },
    // usersFetchingError(state, action: PayloadAction<string>) {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
  extraReducers: {
    [fetchUsers.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<Responce>) => {
      state.isLoading = false;
      state.error = "";
      state.resp.data = action.payload.data;
      state.resp.headers = action.payload.headers;
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  },
});

export default userSlice.reducer;