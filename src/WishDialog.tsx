import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Typography,
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
      setError("Vælg en gavemodtager");
      return;
    }

    if (!formValues.titel) {
      setError("Vælg en titel");
      return;
    }

    onClose(formValues);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Lav et nyt ønske</DialogTitle>
      <Grid justifyContent="center">
        <Typography paragraph>Modtager {formValues.person}</Typography>
      </Grid>
      <Grid container alignItems="center" direction="column" spacing={5}>
        <Grid item>
          <TextField
            id="titel"
            name="titel"
            required
            label={t("titel")}
            type="text"
            value={formValues.titel}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="content"
            name="content"
            label={t("content")}
            type="text"
            value={formValues.content}
            onChange={handleInputChange}
            multiline
          />
        </Grid>
        <Grid item>
          <TextField
            id="price"
            name="price"
            label={t("price")}
            type="text"
            value={formValues.price}
            onChange={handleInputChange}
            multiline
          />
        </Grid>
        <Grid item>
          <TextField
            id="url"
            name="url"
            label="url"
            type="text"
            value={formValues.url}
            onChange={handleInputChange}
            multiline
          />
        </Grid>
        <Grid item>
          <TextField
            id="imageUri"
            name="imageUri"
            label="imageUri"
            type="text"
            value={formValues.imageUri}
            onChange={handleInputChange}
            multiline
          />
        </Grid>
        <Grid item alignItems="center">
          <Typography>Hvilken Modtager?</Typography>
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
        </Grid>
        <Grid item>
          <Typography color="red">{error}</Typography>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            type="submit"
          >
            {t("submit")}
          </Button>
        </Grid>
        <Grid></Grid>
      </Grid>
    </Dialog>
  );
}
