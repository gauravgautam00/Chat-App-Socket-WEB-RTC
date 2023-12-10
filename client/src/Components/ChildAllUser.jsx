import React, { useEffect, useRef } from "react";

const ChildAllUser = (props) => {
  const userDiv = useRef(null);

  // useEffect(() => {
  const handleClick = () => {
    //   if (userDiv.current) {
    //     console.log("clicked user");
    //     userDiv.current.style.backgroundColor = "#2B5279";
    //   }
  };
  // }, []);
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
