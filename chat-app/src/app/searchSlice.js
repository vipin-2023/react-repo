import { createSlice } from "@reduxjs/toolkit";
import { getSearch } from "./services";

const initialState = {
  isLoading: false,
  isError: false,
  searchResult: null,
  isFieldEmpty: false,
  isRegistrationCompleted:false,
  chatList:[]
};
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    isFieldEmpty: (state,action) => {
      state.isFieldEmpty = action.payload.value;
    },
    chatList:(state)=>{

    },
    isRegistrationCompleted: (state) => {
      state.isRegistrationCompleted = !isRegistrationCompleted;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSearch.pending, (state, action) => {
        console.log("pending..");
        state.isLoading = true;
      })
      .addCase(getSearch.fulfilled, (state, action) => {
        console.log("fulfilled..");

        state.isLoading = false;
        state.searchResult = action.payload;
      })
      .addCase(getSearch.rejected, (state, action) => {
        console.log("rejected..");

        state.isLoading = false;
        state.isError = true;
      });
  },
});
export const { isFieldEmpty,isRegistrationCompleted} = searchSlice.actions

export default searchSlice.reducer;
