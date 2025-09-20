import { useDispatch, useSelector} from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type {AppDispatch, RootState} from "../../store/index";

export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;