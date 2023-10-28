import React, { useState } from 'react';
import './Drag.css';

function Drag() {
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggingIndex(index);
  };

  const handleDragEnter = (event, index) => {
    if (draggingIndex !== null && draggingIndex !== index) {
      event.preventDefault();

      const itemRect = event.target.getBoundingClientRect();
      const itemCenterY = itemRect.y + itemRect.height / 2;

      if (event.clientY < itemCenterY) {
        setDragOverIndex(index);
      } else {
        setDragOverIndex(index + 1);
      }
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = () => {
    if (dragOverIndex !== null) {
      const newItems = [...items];
      const draggedItem = newItems[draggingIndex];

      newItems.splice(draggingIndex, 1); // Remove dragged item
      newItems.splice(dragOverIndex, 0, draggedItem); // Insert at new position

      setItems(newItems);
    }

    setDraggingIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="App">
      <h1>Draggable List</h1>
      <ul className="list">
        {items.map((item, index) => (
          <li
            key={index}
            className={`list-item ${index === draggingIndex ? 'dragging' : ''}`}
            style={index === dragOverIndex ? { border: '2px dashed blue' } : {}}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Drag;

