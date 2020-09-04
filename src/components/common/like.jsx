import React from "react";

const Like = (props) => {
  let classes = "fa fa-heart-o";
  let liked = props.liked;
  if (liked === true) {
    classes = "fa fa-heart";
  }
  return (
    <i
      className={classes}
      aria-hidden="true"
      onClick={props.toggleLike}
      style={{ cursor: "pointer" }}
    ></i>
  );
};

export default Like;
