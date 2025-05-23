import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ListMenuStatus } from "@/types/Menu";
import { InputAdornment, OutlinedInput, useTheme } from "@mui/material";
import { ThemeMode } from "@/config";
import { ReactNode } from "react";

interface InputDropdown {
  title: string;
  selectMenu: ListMenuStatus[];
  value: string;
  setValue: (selected: string) => void;
  disabled: boolean;
  rightIcon: ReactNode;
}

const InputDropdown = ({
  title,
  selectMenu,
  value,
  setValue,
  disabled,
  rightIcon,
}: InputDropdown) => {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <FormControl sx={{ width: "100%" }} size="small">
      <InputLabel id="demo-select-small-label" sx={{ marginTop: 0.5 }}>
        {title}
      </InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        label={title}
        onChange={handleChange}
        disabled={disabled}
        input={
          <OutlinedInput
            endAdornment={
              disabled && (
                <InputAdornment position="end">{rightIcon}</InputAdornment>
              )
            }
            sx={{
              backgroundColor: !disabled ? "white" : theme.palette.grey.A800,
              height: 40,
              borderRadius: 1,
              borderWidth: "1px solid",
              borderColor:
                theme.palette.mode === ThemeMode.DARK
                  ? theme.palette.divider
                  : theme.palette.grey.A800,
            }}
          />
        }
      >
        {selectMenu?.map((items: ListMenuStatus, index: number) => (
          <MenuItem key={index} value={items?.status_id}>
            {items?.status_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default InputDropdown;
