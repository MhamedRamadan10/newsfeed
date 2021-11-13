import React from "react";

export default useScroll = () => {
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 10;
    return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
  }

  return { isCloseToBottom  }
};
