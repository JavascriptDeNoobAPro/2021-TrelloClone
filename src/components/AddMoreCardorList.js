import React, { useState } from "react";
import { Paper, Typography, Collapse } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import AddCardListTitle from "./AddCardListTitle";

const AddMoreCardorList = ({ listId, type }) => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <AddCardListTitle setOpen={setOpen} listId={listId} type={type} />
      </Collapse>
      <Collapse in={!open}>
        <Paper className={classes.addCard} onClick={() => setOpen(!open)}>
          <Typography>
            {type === "card" ? "+ Add a Card" : "+ Add another List"}
          </Typography>
        </Paper>
      </Collapse>
    </div>
  );
};

const useStyle = makeStyles((theme) => ({
  root: {
    width: "300px",
    marginTop: theme.spacing(1),
  },
  addCard: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(0, 1, 1, 1),
    background: "#EBECF0",
    "&:hover": {
      backgroundColor: fade("#000", 0.25),
    },
  },
}));

export default AddMoreCardorList;
