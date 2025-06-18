import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useCryptoState } from "../Context/CryptoContext";

function AlertDisplay() {

  const { alert, setAlert } = useCryptoState();

  const handleClose = (event, reason) => {
    if (reason == "clickaway") return;
    setAlert({ open: false });
  };
  return (
    <Snackbar open={alert.open} autoHideDuration={4000} onClose={handleClose} >
      <Alert
        severity={alert.type}
        onClose={handleClose}
        variant="filled"
        elevation={10}
      >
        {alert.msg}
      </Alert>
    </Snackbar>
  );
}

export default AlertDisplay;
