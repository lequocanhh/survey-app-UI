import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

type Props = {
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  surveyValidationErrors: Record<string, string>;
};

export default function BasicPopover({
  anchorEl,
  setAnchorEl,
  surveyValidationErrors,
}: Props) {
    
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2, backgroundColor: "red" }}>
          {Object.values(surveyValidationErrors)[0]}
        </Typography>
      </Popover>
    </div>
  );
}
