import { ChangeEvent, ReactNode, useEffect, useState } from 'react';

// material-ui
import { InputBasePropsSizeOverrides, OutlinedInput } from '@mui/material';

// assets
import SearchIcon from "@mui/icons-material/Search";
import { OverridableStringUnion } from '@mui/types';

// ==============================|| FILTER - INPUT ||============================== //

interface DebouncedInputProps {
  value?: string;
  onFilterChange: (value: string | undefined) => void;
  debounce?: number;
  size?: OverridableStringUnion<"small" | "medium", InputBasePropsSizeOverrides> | undefined;
  startAdornment?: ReactNode;
  placeholder?: string;
}

export const DebouncedInput = ({
  value: initialValue,
  onFilterChange,
  debounce = 500,
  size,
  startAdornment = <SearchIcon />,
  ...props
}: DebouncedInputProps) => {
  const [value, setValue] = useState<string | undefined>(initialValue);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilterChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [value]);

  return (
    <OutlinedInput
      {...props}
      value={value}
      onChange={handleInputChange}
      sx={{ minWidth: 100 }}
      {...(startAdornment && { startAdornment })}
      {...(size && { size })}
    />
  );
};

export default DebouncedInput;
