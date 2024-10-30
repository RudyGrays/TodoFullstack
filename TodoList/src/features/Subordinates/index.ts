export {
  getSubordinateError,
  getSubordinateLoading,
  getSubordinateSelectors,
} from "./model/selectors/selectors";

export { getSubordinatesThunk } from "./model/services/getSubordinates/getSubordinatesThunk";

export {
  SubordinatesActions,
  SubordinateAdapter,
  SubordinatesReducer,
  SubordinateSlice,
} from "./model/slice/SubordinatesSlice";

export type { SubordinateSchema } from "./model/types/SubordinatesSchema";
