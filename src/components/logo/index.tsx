import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, SxProps } from '@mui/material';

// project import
import LogoMain from './LogoMain';
import { APP_DEFAULT_PATH } from '@/config';

// ==============================|| MAIN LOGO ||============================== //

interface LogoSectionProps {
  sx?: SxProps;
  to?: string;
}

const LogoSection = ({ sx, to }: LogoSectionProps) => (
  <ButtonBase
    disableRipple
    component={Link}
    to={!to ? APP_DEFAULT_PATH : to}
    sx={sx}
  >
    <LogoMain />
  </ButtonBase>
);

export default LogoSection;
