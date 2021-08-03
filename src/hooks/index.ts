import { TypedUseSelectorHook, useSelector as selectorHook, useDispatch as dispatchHook } from "react-redux";
import { AppDispatch, AppThunk, TStore } from "../redux/reducers";

export const useSelector: TypedUseSelectorHook<TStore> = selectorHook;

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();