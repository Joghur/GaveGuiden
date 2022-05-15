import {
  Dialog,
  Typography,
  DialogContentText,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Wish, WishStatus } from "./types";
import WishDialogConfirmant from "./WishDialogConfirmant";
import WishDialogNonConfirmant from "./WishDialogNonConfirmant";

interface WishDialogProps {
  onClose: (e?: Wish) => void;
  onDelete: (e?: string) => void;
  handleGift: () => void;
  open: boolean;
  wish?: Wish;
  user?: string;
  confirmant?: boolean;
  gift: boolean;
}

export default function WishDialog(props: WishDialogProps) {
  const { t } = useTranslation(["translation"]);

  const { onClose, onDelete, handleGift, open, wish, user, confirmant, gift } =
    props;

  console.log("confirmant", confirmant);

  const defaultValues: Wish = {
    groupId: 2,
    titel: "",
    status: "pending",
    content: "",
    price: "",
    person: confirmant ? user : undefined,
    giver: !confirmant ? user : undefined,
    comments: [],
    createdAt: new Date(),
    url: "",
    imageUri: "",
  };

  console.log("wish", wish);

  const [formValues, setFormValues] = useState<Wish>(wish || defaultValues);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    console.log("handleInputChange name, value", name, value);
    if (name === "comment") {
      setFormValues({
        ...formValues,
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
      setFormValues(() => wish);
    } else {
      setFormValues(() => defaultValues);
    }
  }, [wish]);

  console.log("formValues", formValues);
  //   console.log("WishDialog user", user);
  //   console.log("confirmant", confirmant);

  const handleComment = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    console.log("handleComment name, value", name, value);
    setComment(value);
    if (formValues.status === "pending") {
      setFormValues({
        ...formValues,
        status: "comment",
      });
    }
  };

  const handleStatus = (newStatus: WishStatus) => {
    console.log("handleStatus newStatus", newStatus);
    setFormValues({
      ...formValues,
      status: newStatus,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!formValues.person) {
      setError(t("errors.missingRecipient"));
      return;
    }

    if (!formValues.titel) {
      setError(t("errors.missingTitle"));
      return;
    }
    if (comment && user) {
      formValues.comments = [
        ...formValues.comments,
        { comment, commenter: user, createdAt: new Date() },
      ];
    }
    console.log("wishDialog - formValues", formValues);
    setError(() => "");
    onClose(formValues);
  };

  const handleClose = () => {
    onClose();
    setError(() => "");
  };

  const handleDelete = () => {
    console.log("WishDialog - formValues?.id", formValues?.id);
    if (formValues?.id) {
      onDelete(formValues?.id);
    }
    setError(() => "");
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
      {(gift || confirmant) && (
        <WishDialogConfirmant
          onDelete={onDelete}
          formValues={formValues}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          handleDelete={handleDelete}
          setFormValues={setFormValues}
          confirmant={confirmant}
        />
      )}
      {!gift && !confirmant && (
        <WishDialogNonConfirmant
          handleSubmit={handleSubmit}
          handleComment={handleComment}
          handleClose={handleClose}
          handleStatus={handleStatus}
          handleGift={handleGift}
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
