import React from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import TextField from "@mui/material/TextField";
import moment, { Moment } from "moment";
import { InputAdornment } from "@mui/material";

interface InputDateProps {
  label: string;
  selectedDate: Moment | null;
  handleDateChange: (newDate: Moment | null) => void;
  disabled?: boolean;
}

const InputDate: React.FC<InputDateProps> = ({
  label,
  selectedDate,
  handleDateChange,
  disabled,
}) => {
  const isDateDisabled = (date: Moment) => {
    return !date.isSame(moment(), "day") && !selectedDate;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        slots={{
          textField: (props: any) => (
            <TextField
              {...props}
              InputProps={{
                ...props.InputProps,
                readOnly: true,
                style: {
                  height: 40,
                  color: "#000",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    {props.InputProps?.endAdornment}
                  </InputAdornment>
                ),
                onKeyDown: (e) => e.preventDefault(),
              }}
            />
          ),
        }}
        label={label}
        value={selectedDate}
        onChange={(newDate) => handleDateChange(newDate as Moment)}
        shouldDisableDate={isDateDisabled}
        sx={{
          width: "100%",
        }}
        disabled={disabled}
        disableFuture={true}
      />
    </LocalizationProvider>
  );
};

export default InputDate;
