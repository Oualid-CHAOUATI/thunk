import { createSlice } from "@reduxjs/toolkit";

const initialState = { isShowCart: false, notification: null };
export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleShowCart(state) {
      state.isShowCart = !state.isShowCart;
    },
    showNotification(state, { type, payload: { status, message, title } }) {
      state.notification = { status, message, title };
    },
  },
});

export const uiSliceActions = uiSlice.actions;
