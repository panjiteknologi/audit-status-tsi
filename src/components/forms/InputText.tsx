import { FormControl } from "@mui/base/FormControl";
import { FormHelperText, TextField } from "@mui/material";

interface InputTextProps {
  label?: string;
  onBlur?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  onChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  error?: boolean;
  errorMessage?: string | undefined;
  values?: string;
  name?: string;
  disabled?: boolean;
}

const InputText = ({
  label,
  onBlur,
  onChange,
  error,
  errorMessage,
  values,
  name,
  disabled,
}: InputTextProps) => {
  return (
    <FormControl defaultValue="" required>
      <TextField
        label={label}
        fullWidth
        type="text"
        onBlur={onBlur}
        onChange={onChange}
        value={values}
        name={name}
        error={error}
        InputLabelProps={{
          style: {
            height: 20,
          },
        }}
        disabled={disabled}
      />
      {error && (
        <FormHelperText error id="standard-weight-helper-text">
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default InputText;
