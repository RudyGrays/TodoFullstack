import { createReduxStore } from "../config/store";
import { StateSchema } from "../config/StateSchema";
import { DeepPartial } from "react-hook-form";
import { FC, ReactNode } from "react";
import { Provider } from "react-redux";

interface StoreProviderProps {
  initialState?: DeepPartial<StateSchema>;
  children: ReactNode;
}

export const StoreProvider: FC<StoreProviderProps> = ({
  initialState,
  children,
}) => {
  const store = createReduxStore(initialState as StateSchema);

  return (
    <Provider stabilityCheck="never" store={store}>
      {children}
    </Provider>
  );
};
