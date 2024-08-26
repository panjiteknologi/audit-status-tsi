import { ChangeEvent, ReactNode, useEffect, useMemo, useState } from "react";

// material-ui
import { InputBasePropsSizeOverrides, OutlinedInput } from "@mui/material";

// assets
import SearchIcon from "@mui/icons-material/Search";
import { OverridableStringUnion } from "@mui/types";

// ==============================|| FILTER - INPUT ||============================== //

interface DebouncedInputProps {
  value?: string;
  onFilterChange: (value: string | undefined) => void;
  debounce?: number;
  size?:
    | OverridableStringUnion<"small" | "medium", InputBasePropsSizeOverrides>
    | undefined;
  startAdornment?: ReactNode;
  placeholder?: string;
  useResponsiveWidth?: boolean;
}

export const DebouncedInput = ({
  value: initialValue,
  onFilterChange,
  debounce = 500,
  size,
  startAdornment = <SearchIcon />,
  useResponsiveWidth,
  ...props
}: DebouncedInputProps) => {
  const [value, setValue] = useState<string | undefined>(initialValue);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

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

  const defaultWidth = useMemo(() => {
    if (useResponsiveWidth) {
      return {
        minWidth: 100,
        width: { xs: "100%", sm: "100%", md: "auto" },
        marginBottom: { xs: 2, sm: 2, md: 0 },
      };
    }

    return {
      minWidth: 100,
    };
  }, [useResponsiveWidth]);

  return (
    <OutlinedInput
      {...props}
      value={value}
      onChange={handleInputChange}
      sx={defaultWidth}
      {...(startAdornment && { startAdornment })}
      {...(size && { size })}
    />
  );
};

export default DebouncedInput;
