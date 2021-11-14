import React, { useReducer } from "react";

const forceUpdateReducer = (i) => i + 1

export default  useForceUpdate = () => {
  const [, forceUpdate] = useReducer(forceUpdateReducer, 0)
  return { forceUpdate  }
}
