import React from "react";
import {
  LocalizationProvider,
  DatePicker,
  DateView,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import TextField from "@mui/material/TextField";
import moment, { Moment } from "moment";
import { InputAdornment } from "@mui/material";

interface InputDateProps {
  label: string;
  selectedDate: Moment | null;
  handleDateChange: (newDate: Moment | null) => void;
  disabled?: boolean;
  views?: DateView[];
}
const InputDate: React.FC<InputDateProps> = ({
  label,
  selectedDate,
  handleDateChange,
  disabled,
  views = ["day"],
}) => {
  const today = moment();

  const isDateDisabled = (date: Moment) => {
    return date.isBefore(today, "day") && !selectedDate;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        slots={{
          textField: (props: any) => (
            <TextField
              {...props}
              value={selectedDate ? selectedDate.format("MM/DD/YYYY") : ""}
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
              error={false}
              placeholder="DD/MM/YYYY"
            />
          ),
        }}
        label={label}
        value={selectedDate}
        onChange={
          views ? undefined : (newDate) => handleDateChange(newDate as Moment)
        }
        onYearChange={(newDate) => handleDateChange(newDate as Moment)}
        shouldDisableDate={isDateDisabled}
        sx={{
          width: "100%",
        }}
        onError={() => {}}
        disabled={disabled}
        disableFuture={views ? false : true}
        disablePast={views ? false : true}
        openTo={views ? undefined : "day"}
        views={views}
      />
    </LocalizationProvider>
  );
};

export default InputDate;
