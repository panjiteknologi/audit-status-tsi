import React from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import TextField from "@mui/material/TextField";
import moment, { Moment } from "moment";

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
    return !date.isSame(moment(), "day");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        renderInput={(props: any) => (
          <TextField
            {...props}
            InputProps={{
              style: {
                height: 20,
              },
            }}
          />
        )}
        label={label}
        value={selectedDate}
        onChange={(newDate) => handleDateChange(newDate as Moment)}
        shouldDisableDate={isDateDisabled}
        sx={{
          width: "100%",
        }}
        disabled={disabled}
      />
    </LocalizationProvider>
  );
};

export default InputDate;
