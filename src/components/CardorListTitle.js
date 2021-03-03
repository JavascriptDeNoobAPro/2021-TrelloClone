import React, { useState, useContext } from "react";
import { Typography, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import contextAPI from "../contextAPI";

const CardorListTitle = ({ title, listId }) => {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const { updateListTitle } = useContext(contextAPI);
  const classes = useStyle();
  const handleOnChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleOnBlur = () => {
    updateListTitle(newTitle, listId);
    setOpen(false);
  };
  return (
    <div>
      {open ? (
        <div>
          <InputBase
            onChange={handleOnChange}
            autoFocus
            value={newTitle}
            inputProps={{
              className: classes.input,
            }}
            fullWidth
            onBlur={handleOnBlur}
          />
        </div>
      ) : (
        <div className={classes.title}>
          <Typography
            onClick={() => setOpen(!open)}
            className={classes.titleText}
          >
            {title}
          </Typography>
          <MoreHorizIcon />
        </div>
      )}
    </div>
  );
};

const useStyle = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(1),
    display: "flex",
  },
  titleText: {
    flexGrow: 1,
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  input: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    margin: theme.spacing(1),
    "&:focus": {
      background: "#ddd",
    },
  },
}));

export default CardorListTitle;
