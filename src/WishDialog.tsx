import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Wish } from "./types";
import WishDialogConfirmant from "./WishDialogConfirmant";
import WishDialogNonConfirmant from "./WishDialogNonConfirmant";

interface WishDialogProps {
  onClose: (e?: Wish) => void;
  onDelete: (e?: string) => void;
  open: boolean;
  wish?: Wish;
  user?: string;
  confirmant?: boolean;
}

export default function WishDialog(props: WishDialogProps) {
  const { t } = useTranslation(["translation"]);

  const { onClose, onDelete, open, wish, user, confirmant } = props;

  const defaultValues: Wish = {
    groupId: 2,
    titel: "",
    status: "pending",
    person: confirmant ? user : undefined,
    comments: [],
    createdAt: new Date(),
  };

  const [formValues, setFormValues] = useState<Wish>(wish || defaultValues);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    console.log("handleInputChange name, value", name, value);
    if (name === "comment") {
      setFormValues({
        ...formValues,
        // comments: [...formValues.comments, comment],
      });
      return;
    }

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    if (wish) {
      setFormValues(wish);
    }
  }, [wish]);

  console.log("wish", wish);
  console.log("formValues", formValues);
  console.log("WishDialog user", user);
  console.log("confirmant", confirmant);

  const handleComment = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    console.log("handleComment name, value", name, value);
    setComment(value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!formValues.person) {
      setError(t("errors.missingRecipient"));
      return;
    }

    if (!formValues.titel) {
      setError("errors.missingTitle");
      return;
    }
    if (comment && user) {
      formValues.comments = [
        ...formValues.comments,
        { comment, commenter: user, createdAt: new Date() },
      ];
    }
    onClose(formValues);
  };

  const handleClose = () => {
    onClose();
  };

  const handleDelete = () => {
    console.log("WishDialog - formValues?.id", formValues?.id);
    if (formValues?.id) {
      onDelete(formValues?.id);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      {confirmant && (
        <WishDialogConfirmant
          onDelete={onDelete}
          formValues={formValues}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          handleDelete={handleDelete}
          setFormValues={setFormValues}
        />
      )}
      {!confirmant && (
        <WishDialogNonConfirmant
          handleSubmit={handleSubmit}
          handleComment={handleComment}
          formValues={formValues}
          comment={comment}
        />
      )}
      <DialogContentText>
        <Typography color="red">{error}</Typography>
      </DialogContentText>
    </Dialog>
  );
}
