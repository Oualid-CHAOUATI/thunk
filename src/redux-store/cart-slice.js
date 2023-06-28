import { createSlice } from "@reduxjs/toolkit";
import { uiSliceActions } from "./ui-slice";
import { NOTIFICATION_STATUS } from "../components/UI/notification/notification";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  isChanged: false, //! not sent to server.. used only on front-end to check when to send or not data to server
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, { type, payload }) {
      const existingItem = state.items.find((item) => item.id === payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...payload, quantity: 1 });
      }
      state.isChanged = true;
      state.totalQuantity += 1;
      state.totalPrice += payload.price;
    },
    remove(state, { type, payload }) {
      state.isChanged = true;
      const id = payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);
      if (existingItemIndex === -1) return;

      const existingItem = state.items[existingItemIndex];

      const exisingQuantity = existingItem.quantity;
      if (exisingQuantity > 1) existingItem.quantity -= 1;
      else {
        state.items.splice(existingItemIndex, 1);
      }

      state.totalQuantity -= 1;
      state.totalPrice -= existingItem.price;
    },
    setCart(state, { type, payload: { items, totalQuantity, totalPrice } }) {
      state.items = items;
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
    },
  },
});

export const cartSliceActions = cartSlice.actions;

export const sendDataToFirebase = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiSliceActions.showNotification({
        status: NOTIFICATION_STATUS.pending,
        title: "sending!",
        message: "sending data to server ...",
      })
    );
    try {
      const { items, totalQuantity, totalPrice } = cart;
      const response = await fetch(
        "https://react-academind-http-df4f1-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({ items, totalQuantity, totalPrice }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("failed to send data...");
      }
      dispatch(
        uiSliceActions.showNotification({
          status: NOTIFICATION_STATUS.success,
          title: "sucess!",
          message: "data sent with success!",
        })
      );
    } catch (err) {
      dispatch(
        uiSliceActions.showNotification({
          status: NOTIFICATION_STATUS.error,
          title: "error",
          message: err.message,
        })
      );
    }
  };
};

export const getDataFromFirebase = () => {
  return async (dispatch) => {
    dispatch(
      uiSliceActions.toggleShowCart({
        status: NOTIFICATION_STATUS.pending,
        title: "fetching!",
        message: "fetching data from server...",
      })
    );

    try {
      const response = await fetch(
        "https://react-academind-http-df4f1-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
      );
      if (!response.ok) throw new Error("failed to fetch data");
      dispatch(
        uiSliceActions.showNotification({
          status: NOTIFICATION_STATUS.success,
          title: "success",
          message: "successfully fetched data!",
        })
      );
      const data = await response.json();
      dispatch(cartSliceActions.setCart(data));
      console.log(data);
    } catch (err) {
      dispatch(
        uiSliceActions.showNotification({
          status: NOTIFICATION_STATUS.error,
          title: "error",
          message: err.message,
        })
      );
    }
  };
};
