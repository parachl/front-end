import { HIDE_POPUP, SHOW_POPUP } from "../constants/Constants";

export const showPopup = (payload) => ({
  type: SHOW_POPUP,
  payload,
});

export const hidePopup = () => ({
  type: HIDE_POPUP,
});
