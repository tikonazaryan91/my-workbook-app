import reducer from "./index";
import * as types from "./types";

describe("beneficiaries reducer", () => {
  const initialState = {
    user: null,
    error: null,
  };

  it("return initial state", () => {
    expect(reducer(undefined, { type: "BLA_BLA" })).toEqual(initialState);
  });

  it("should handle AUTH_SUCCESS", () => {
    const user = { userName: "test" };
    expect(
      reducer(initialState, {
        type: types.AUTH_SUCCESS,
        payload: user,
      })
    ).toEqual({
      ...initialState,
      user,
    });
  });

  it("should handle AUTH_FAIL", () => {
    const error = "test error";
    expect(
      reducer(initialState, {
        type: types.AUTH_FAIL,
        error,
      })
    ).toEqual({
      ...initialState,
      error,
    });
  });
});
