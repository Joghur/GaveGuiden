import { useState } from "react";
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

interface SettingDialogProps {
  onClose: (e?: Wish) => void;
  open: boolean;
}

const SettingsDialog = (props: SettingDialogProps) => {
  const [formValues, setFormValues] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{t("newWish")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <TextField
            id="code"
            name="code"
            label="Kode"
            type="text"
            value={formValues.code}
            onChange={handleInputChange}
          />
        </DialogContentText>
        <DialogContentText>
          <Typography color="red">{error}</Typography>
        </DialogContentText>
      </DialogContent>
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
};

export default SettingsDialog;
