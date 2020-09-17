import React from "react";

const ListGroup = (props) => {
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedGenre,
  } = props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          className={
            item === selectedGenre
              ? "list-group-item active"
              : "list-group-item"
          }
          key={item[valueProperty] || item.name}
          onClick={() => onItemSelect(item)}
          style={{ cursor: "pointer" }}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
