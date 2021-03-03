import React, { useState, useContext } from "react";
import { Paper, InputBase, Button, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles, fade } from "@material-ui/core/styles";
import contextAPI from "../contextAPI";

const AddCardListTitle = ({ setOpen, listId, type }) => {
  const classes = useStyle();
  const { addCard, addList } = useContext(contextAPI);
  const [title, setTitle] = useState("");

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };
  const handleBtnConfirm = () => {
    if (type === "card") {
      addCard(title, listId);
    } else {
      addList(title);
    }
    setTitle("");
    setOpen(false);
  };

  return (
    <div>
      <div>
        <Paper className={classes.card}>
          <InputBase
            onChange={handleOnChange}
            multiline
            onBlur={() => setOpen(false)}
            fullWidth
            inputProps={{
              className: classes.input,
            }}
            value={title}
            placeholder={
              type === "card"
                ? "Enter a title of this card.."
                : "Enter list title..."
            }
          />
        </Paper>
      </div>
      <div className={classes.confirm}>
        <Button className={classes.btnConfirm} onClick={handleBtnConfirm}>
          {type === "card" ? "Add Card" : "Add List"}
        </Button>
        <IconButton onClick={() => setOpen(false)}>
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
};

const useStyle = makeStyles((theme) => ({
  card: {
    width: "280px",
    margin: theme.spacing(1),
    paddingBottom: theme.spacing(4),
  },
  input: {
    margin: theme.spacing(1),
  },
  btnConfirm: {
    background: "#5AAC44",
    color: "#fff",
    "&:hover": {
      background: fade("#5AAC44", 0.75),
    },
  },
  confirm: {
    margin: theme.spacing(0, 1, 1, 1),
  },
}));

export default AddCardListTitle;
