import React, { SetStateAction } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import TextField from "@mui/material/TextField";
import { Moment } from "moment";
import { colors } from "@mui/material";

interface InputDateProps {
  label: string;
  selectedDate: Moment;
  handleDateChange: (newDate: SetStateAction<Moment>) => void;
  disabled?: boolean;
}

const InputDate: React.FC<InputDateProps> = ({
  label,
  selectedDate,
  handleDateChange,
  disabled,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        renderInput={(props) => (
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
        onChange={(newDate) => handleDateChange(newDate)}
        sx={{
          width: "100%",
        }}
        disabled={disabled}
      />
    </LocalizationProvider>
  );
};

export default InputDate;
