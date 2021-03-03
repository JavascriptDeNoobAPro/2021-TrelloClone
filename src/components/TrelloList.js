import { Paper, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Droppable, Draggable } from "react-beautiful-dnd";
import CardorListTitle from "./CardorListTitle";
import TrelloCard from "./TrelloCard";
import AddMoreCardorList from "./AddMoreCardorList";

const TrelloList = ({ list, index }) => {
  const classes = useStyle();
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <Paper className={classes.root} {...provided.dragHandleProps}>
            <CssBaseline />
            <CardorListTitle title={list.title} listId={list.id} />
            <Droppable droppableId={list.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={classes.cardContainer}
                >
                  {list.cards.map((card, index) => (
                    <TrelloCard key={card.id} card={card} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <AddMoreCardorList listId={list.id} type='card' />
          </Paper>
        </div>
      )}
    </Draggable>
  );
};

const useStyle = makeStyles((theme) => ({
  root: {
    minWidth: "300px",
    backgroundColor: "#EBECF0",
    marginLeft: theme.spacing(1),
  },
  cardContainer: {
    marginTop: theme.spacing(4),
  },
}));

export default TrelloList;
