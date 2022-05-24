import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

const reorderList = (list, startIndex, endIndex) => {
  const arrayList = Array.from(list);
  const [removed] = arrayList.splice(startIndex, 1);
  arrayList.splice(endIndex, 0, removed);
  return arrayList;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  padding: "10px",
  margin: `0 0 8px 0`,
  background: isDragging ? "#D8E3E7" : "white",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "#A7BBC7",
  padding: "10px",
  width: 400,
});

function App() {
  const [itemListData, setItemListData] = useState([
    {
      img: "https://material-components-web.appspot.com/images/photos/3x2/6.jpg",
    },
    {
      img: "https://material-components-web.appspot.com/images/photos/3x2/5.jpg",
    },
    {
      img: "https://material-components-web.appspot.com/images/photos/3x2/3.jpg",
    },
    {
      img: "https://material-components-web.appspot.com/images/photos/3x2/2.jpg",
    },
    {
      img: "https://material-components-web.appspot.com/images/photos/3x2/1.jpg",
    },
    {
      img: "https://material-components-web.appspot.com/images/photos/3x2/7.jpg",
    },
    {
      img: "https://material-components-web.appspot.com/images/photos/3x2/8.jpg",
    },
    {
      img: "https://material-components-web.appspot.com/images/photos/3x2/9.jpg",
    },
    {
      img: "https://material-components-web.appspot.com/images/photos/3x2/4.jpg",
    },
    {
      img: "https://material-components-web.appspot.com/images/photos/3x2/10.jpg",
    },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorderList(
      itemListData,
      result.source.index,
      result.destination.index
    );
    setItemListData(items);
  };

  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {itemListData &&
                itemListData.map((item, index) => (
                  <Draggable
                    key={item.img}
                    draggableId={item.img}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className="d-flex justify-space-between"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <img width="100%" src={item.img} />
                      </div>
                    )}
                  </Draggable>
                ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}

export default App;
