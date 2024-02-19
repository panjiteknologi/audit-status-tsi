import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import AppBar from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';
import {
  useMediaQuery,
  Box,
  Button,
  Chip,
  Container,
  Drawer,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

// project import
import Logo from '@/components/logo';
import IconButton from '@/components/@extended/IconButton';
import AnimateButton from '@/components/@extended/AnimateButton';
import { ThemeMode } from '@/config';

// assets
import { MenuRounded, RemoveRounded } from '@mui/icons-material';

// ==============================|| COMPONENTS - HEADER ||============================== //


const Header = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerToggle, setDrawerToggle] = useState(false);

  /** Method called on multiple components with different event types */
  const drawerToggler = (open: boolean) => (event: KeyboardEvent) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerToggle(open);
  };

  return (
    <AppBar sx={{ bgcolor: 'white' }}>
      <Container disableGutters={matchDownMd}>
        <Toolbar sx={{ px: { xs: 1.5, md: 0, lg: 0 }, py: 2 }}>
          <Stack direction="row" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }} alignItems="center">
            <Typography component="div" sx={{ textAlign: 'left', display: 'inline-block' }}>
              <Logo to="/" />
            </Typography>
            <Chip
              label={import.meta.env.VITE_APP_VERSION}
              variant="outlined"
              size="small"
              color="secondary"
              sx={{ mt: 0.5, ml: 1, fontSize: '0.725rem', height: 20, '& .MuiChip-label': { px: 0.5 } }}
            />
          </Stack>
          <Stack
            direction="row"
            sx={{
              '& .header-link': { px: 1, '&:hover': { color: theme.palette.primary.main } },
              display: { xs: 'none', md: 'block' }
            }}
            spacing={2}
          >
            <Link className="header-link" color={'secondary'} component={RouterLink} to="/about" underline="none">
              Tentang Kami
            </Link>
            <Link className="header-link" color={'secondary'} component={RouterLink} to="/contact" underline="none">
              Kontak
            </Link>
            <Box sx={{ display: 'inline-block' }}>
              <AnimateButton>
                <Button component={Link} href="/login" disableElevation color="primary" variant="contained">
                  Login
                </Button>
              </AnimateButton>
            </Box>
          </Stack>
          <Box
            sx={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              display: { xs: 'flex', md: 'none' }
            }}
          >
            <Typography component="div" sx={{ textAlign: 'left', display: 'inline-block' }}>
              <Logo to="/" />
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                component={RouterLink}
                to="/login"
                sx={{ mt: 0.5, height: 28 }}
              >
                Login
              </Button>

              <IconButton
                color="secondary"
                onClick={drawerToggler(true)}
                sx={{
                  '&:hover': { bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.lighter' : 'secondary.dark' }
                }}
              >
                <MenuRounded style={{ color: theme.palette.mode === ThemeMode.DARK ? 'inherit' : theme.palette.grey[100] }} />
              </IconButton>
            </Stack>
            <Drawer
              anchor="top"
              open={drawerToggle}
              onClose={drawerToggler(false)}
              sx={{ '& .MuiDrawer-paper': { backgroundImage: 'none' } }}
            >
              <Box
                sx={{
                  width: 'auto',
                  '& .MuiListItemIcon-root': {
                    fontSize: '1rem',
                    minWidth: 28
                  }
                }}
                role="presentation"
              >
                <List>
                  <Link style={{ textDecoration: 'none' }} href="/pricing">
                    <ListItemButton component="span">
                      <ListItemIcon>
                        <RemoveRounded />
                      </ListItemIcon>
                      <ListItemText primary="Tentang Kami" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                    </ListItemButton>
                  </Link>
                  <Link style={{ textDecoration: 'none' }} href="/contact">
                    <ListItemButton component="span">
                      <ListItemIcon>
                        <RemoveRounded />
                      </ListItemIcon>
                      <ListItemText primary="Kontak" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                    </ListItemButton>
                  </Link>
                </List>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
