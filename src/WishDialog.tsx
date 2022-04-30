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
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Wish } from "./types";

interface WishDialogProps {
  onClose: (e?: Wish) => void;
  open: boolean;
}

const defaultValues: Wish = {
  groupId: 2,
  titel: "",
  status: "pending",
  person: undefined,
  comments: [],
  createdAt: new Date(),
};

export default function WishDialog(props: WishDialogProps) {
  const { t } = useTranslation(["translation"]);

  const { onClose, open } = props;

  const [formValues, setFormValues] = useState<Wish>(defaultValues);
  const [error, setError] = useState("");

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // console.log("formValues", formValues);

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

    onClose(formValues);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{t("newWish")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography paragraph>
            {t("recipient")}{" "}
            <span
              style={{
                color: "blue",
                borderWidth: 1,
                borderColor: "black",
              }}
            >
              {formValues.person}
            </span>
          </Typography>
        </DialogContentText>
        <DialogContentText>
          <Typography color="red">{error}</Typography>
        </DialogContentText>
        <TextField
          id="titel"
          name="titel"
          required
          label={t("titel")}
          type="text"
          value={formValues.titel}
          onChange={handleInputChange}
        />
        <TextField
          id="content"
          name="content"
          label={t("content")}
          type="text"
          value={formValues.content}
          onChange={handleInputChange}
          multiline
        />
        <TextField
          id="price"
          name="price"
          label={t("price")}
          type="text"
          value={formValues.price}
          onChange={handleInputChange}
          multiline
        />
        <TextField
          id="url"
          name="url"
          label={t("vendorUrl")}
          type="text"
          value={formValues.url}
          onChange={handleInputChange}
          multiline
        />
        <TextField
          id="imageUri"
          name="imageUri"
          label={t("imageUri")}
          type="text"
          value={formValues.imageUri}
          onChange={handleInputChange}
          multiline
        />
      </DialogContent>
      <Grid container justifyContent="center">
        <DialogContentText>
          <Typography>{t("whichReceipient")}</Typography>
        </DialogContentText>
      </Grid>
      <Grid container justifyContent="center">
        <DialogActions>
          <Button
            onClick={() =>
              setFormValues({
                ...formValues,
                person: "Esther",
              })
            }
            variant="contained"
            color="secondary"
          >
            Esther
          </Button>
          <Button
            onClick={() =>
              setFormValues({
                ...formValues,
                person: "Isabel",
              })
            }
            variant="contained"
            color="secondary"
          >
            Isabel
          </Button>
        </DialogActions>
      </Grid>
      <Grid container justifyContent="center">
        <DialogActions>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            type="submit"
          >
            {t("submit")}
          </Button>
        </DialogActions>
      </Grid>
    </Dialog>
  );
}
