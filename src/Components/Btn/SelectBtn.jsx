import { Button } from "@mui/material";

const SelectBtn = ({ children, selected, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant={selected ? "contained" : "outlined"}
      sx={{
        border: "1px solid gold",
        borderRadius: 2,
        px: 2.5,
        py: 1.25,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "transparent",
        color: selected ? "black" : "white",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
          backgroundColor: "gold",
          color: "black",
        },
        width: "22%",
      }}
    >
      {children}
    </Button>
  );
};

export default SelectBtn;
