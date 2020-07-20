import React from "react";
import DragArea from "../../Components/DragArea";

import { useSelector } from "react-redux";

export default function ComponentArea() {
  const page = useSelector((state) => state.componentsInfo);

  return (
    <div>
      Componentler
      {page.map((card, i) => (
        <DragArea
          key={card.id}
          id={card.id}
          componentName={card.componentName}
        />
      ))}
    </div>
  );
}
