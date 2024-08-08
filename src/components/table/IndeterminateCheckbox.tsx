// material-ui
import { Checkbox } from '@mui/material';

// ==============================|| ROW SELECTION - CHECKBOX ||============================== //

const IndeterminateCheckbox = ({ indeterminate, checked, ...rest }: { indeterminate: boolean, checked: boolean }) => {
  return <Checkbox {...rest} indeterminate={typeof indeterminate === 'boolean' && !checked && indeterminate} />;
};

export default IndeterminateCheckbox;
