import { SHOWMODAL, HIDEMODAL, SHOWMODAL_ASYNC } from "../const/modal.const";

export const show = () => ({type: SHOWMODAL});
export const hide = () => ({type: HIDEMODAL});

export const show_async = () => ({type: SHOWMODAL_ASYNC});