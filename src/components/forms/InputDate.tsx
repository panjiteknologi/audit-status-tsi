import React, { SetStateAction } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import TextField from "@mui/material/TextField";
import { Moment } from "moment";

interface InputDateProps {
  label: string;
  selectedDate: Moment;
  handleDateChange: (newDate: SetStateAction<Moment>) => void;
}

const InputDate: React.FC<InputDateProps> = ({
  label,
  selectedDate,
  handleDateChange,
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
      />
    </LocalizationProvider>
  );
};

export default InputDate;
