import React, { useState, useRef } from "react";
import { TextField, Popper, ClickAwayListener, Box } from "@mui/material";
import { DateRange, RangeKeyDict } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface InputDateProps {
  label: string;
  selectedDate: {
    startDate: Date | any;
    endDate: Date | any;
    key: string;
  };
  handleDateChange: (range: {
    startDate: Date | any;
    endDate: Date | any;
  }) => void;
  disabled?: boolean;
}

const InputDateRange: React.FC<InputDateProps> = ({
  label,
  selectedDate,
  handleDateChange,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleRangeChange = (item: RangeKeyDict) => {
    const { startDate, endDate } = item.selection;
    handleDateChange({ startDate, endDate });
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const formattedValue = `${format(
    selectedDate.startDate,
    "MM/dd/yyyy"
  )} - ${format(selectedDate.endDate, "MM/dd/yyyy")}`;

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box>
          <TextField
            label={label}
            inputRef={anchorRef}
            onClick={() => setOpen(true)}
            value={formattedValue}
            fullWidth
            disabled={disabled}
            InputProps={{
              readOnly: true,
            }}
          />
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            placement="bottom-start"
            style={{ zIndex: 1300 }}
          >
            <Box
              sx={{
                mt: 1,
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                bgcolor: "background.paper",
                boxShadow: 3,
              }}
            >
              <DateRange
                editableDateInputs
                onChange={handleRangeChange}
                moveRangeOnFirstSelection={false}
                ranges={[selectedDate]}
              />
            </Box>
          </Popper>
        </Box>
      </ClickAwayListener>
    </>
  );
};

export default InputDateRange;
