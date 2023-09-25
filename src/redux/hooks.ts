// import or reuse functions inside React
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispach, RootState } from "./store";

export const useAppDispach = () => useDispatch<AppDispach>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;