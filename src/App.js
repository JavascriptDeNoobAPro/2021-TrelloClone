import React, { useState } from "react";
import uuid from "react-uuid";
import contextAPI from "./contextAPI";
import { makeStyles } from "@material-ui/core/styles";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TrelloList from "./components/TrelloList";
import AddCardListTitle from "./components/AddCardListTitle";
import mockData from "./mockData";
import background_image from "./images/Photo_by_XPS_Unsplash.jpg";

export default function App() {
  const [data, setData] = useState(mockData);

  const classes = useStyle();
  const addCard = (title, listId) => {
    console.log(title, listId);

    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title,
    };

    const list = data.lists[listId];
    list.cards = [...list.cards, newCard];

    setData({
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    });
  };

  const addList = (title) => {
    const newListId = uuid();
    const newList = {
      id: newListId,
      title,
      cards: [],
    };

    setData({
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newList,
      },
    });
  };

  const updateListTitle = (title, listId) => {
    const list = data.lists[listId];
    list.title = title;

    setData({
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    });
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    console.log("destination", destination, "source", source, draggableId);

    if (!destination) {
      return;
    }
    if (type === "list") {
      const newListIds = data.listIds;
      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);
      return;
    }

    const sourceList = data.lists[source.droppableId];
    const destinationList = data.lists[destination.droppableId];
    const draggingCard = sourceList.cards.filter(
      (card) => card.id === draggableId
    )[0];

    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);

      setData({
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: destinationList,
        },
      });
    } else {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);

      setData({
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList,
        },
      });
    }
  };

  return (
    <contextAPI.Provider value={{ addCard, addList, updateListTitle }}>
      <div className={classes.root}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='123' type='list' direction='horizontal'>
            {(provided) => (
              <div
                className={classes.container}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {data.listIds.map((listId, index) => {
                  const list = data.lists[listId];
                  return <TrelloList list={list} key={listId} index={index} />;
                })}
                <AddCardListTitle type='list' />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </contextAPI.Provider>
  );
}

const useStyle = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${background_image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    overflowY: "auto",
  },
  container: {
    display: "flex",
  },
}));
