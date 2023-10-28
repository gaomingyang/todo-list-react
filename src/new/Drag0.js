import React, { useState } from 'react';
import './Drag.css';

function Drag() {
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  const handleDragStart = (index) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (event, index) => {
    if (draggingIndex === null) return;
    event.preventDefault();

    const newItems = [...items];
    const draggedItem = newItems[draggingIndex];

    newItems.splice(draggingIndex, 1); // Remove dragged item
    newItems.splice(index, 0, draggedItem); // Insert at new position

    setItems(newItems);
    setDraggingIndex(index); // Update dragging index to reflect new position
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };

  return (
    <div className="App">
      <h1>Draggable List</h1>
      <ul className="list">
        {items.map((item, index) => (
          <li
            key={index}
            className={`list-item ${index === draggingIndex ? 'dragging' : ''}`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Drag;
