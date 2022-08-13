import React from "react";

// The main goal of this component is to show all the problems in a list  in small boxes
export function ListofText({ title="Note", list=["this is a note","this is another note","this is also a note"] }) {
  return (
    <div>
      <h3>{title}</h3>
      {list.map((item, index) => {
        return (
          <p key={index}>
            {index + 1}. {item}
          </p>
        );
      })}
    </div>
  );
}