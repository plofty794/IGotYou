import { Dispatch, ReactNode, createContext, useReducer } from "react";

export const UserStateContextProvider = createContext<TDefaultValue>({
  state: {
    state: null,
  },
  dispatch: () => {},
});

type TAction = {
  type: "ADMIN_LOGIN" | "ADMIN_LOGOUT";
  payload: string | null;
};

type TState = {
  state: string | null;
};

type TDefaultValue = {
  state: TState;
  dispatch: Dispatch<TAction>;
};

function reducer(state: TState, action: TAction) {
  switch (action.type) {
    case "ADMIN_LOGIN":
      localStorage.setItem("isAdmin", JSON.stringify(action.payload));
      return { state: action.payload };
    case "ADMIN_LOGOUT":
      return { state: action.payload };
    default:
      return state;
  }
}

function UserStateContext({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { state: null });

  return (
    <UserStateContextProvider.Provider value={{ dispatch, state }}>
      {children}
    </UserStateContextProvider.Provider>
  );
}

export default UserStateContext;
