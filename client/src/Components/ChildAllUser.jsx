import React, { useRef } from "react";

const ChildAllUser = (props) => {
  const userDiv = useRef(null);

  const handleClick = () => {};
  return (
    <div
      id="childAllUser_container"
      onClick={() => {
        props.selectThisUser(props._id, props.name);
        handleClick();
      }}
      ref={userDiv}
    >
      {props.name}
    </div>
  );
};

export default ChildAllUser;
