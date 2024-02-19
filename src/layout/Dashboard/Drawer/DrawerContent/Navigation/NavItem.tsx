import { useEffect } from 'react';
import { useLocation, matchPath, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

// project import
import Dot from '@/components/@extended/Dot';
import useConfig from '@/hooks/useConfig';

import { MenuOrientation, ThemeMode } from '@/config';
import { handlerHorizontalActiveItem, handlerActiveItem, handlerDrawerOpen, useGetMenuMaster } from '@/api/menu';
import { MainMenu } from '@/menu-items';

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

interface NavItemProps {
  item?: MainMenu;
  level?: number;
  isParents?: boolean;
};

const NavItem = ({ item, level, isParents = false }: NavItemProps) => {
  const theme = useTheme();
  const navigate = useNavigate()

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;
  const openItem = menuMaster?.openedItem;

  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { menuOrientation } = useConfig();

  const Icon = item?.icon as any;
  const itemIcon = item?.icon ? (
    <Icon
      style={{
        fontSize: drawerOpen ? '1rem' : '1.25rem',
        ...(menuOrientation === MenuOrientation.HORIZONTAL && isParents && { fontSize: 20, stroke: '1.5' })
      }}
    />
  ) : (
    false
  );

  const { pathname } = useLocation();
  const isSelected = !!matchPath({ path: `item?.url`, end: false }, pathname) || openItem === item?.id;

  // active menu item on page load
  useEffect(() => {
    if (pathname === item?.url) handlerActiveItem(item.id);
    // eslint-disable-next-line
  }, [pathname]);

  const textColor = theme.palette.mode === ThemeMode.DARK ? 'grey.400' : 'text.primary';
  const iconSelectedColor = theme.palette.mode === ThemeMode.DARK && drawerOpen ? 'text.primary' : 'primary.main';

  return (
    <>
      {menuOrientation === MenuOrientation.VERTICAL || downLG ? (
        <Box sx={{ position: 'relative' }}>
          <ListItemButton
            onClick={() => navigate(String(item?.url))}
            selected={isSelected}
            sx={{
              zIndex: 1201,
              pl: drawerOpen ? `${Number(level) * 28}px` : 1.5,
              py: !drawerOpen && level === 1 ? 1.25 : 1,
              ...(drawerOpen && {
                '&:hover': {
                  bgcolor: theme.palette.mode === ThemeMode.DARK ? 'divider' : 'primary.lighter'
                },
                '&.Mui-selected': {
                  bgcolor: theme.palette.mode === ThemeMode.DARK ? 'divider' : 'primary.lighter',
                  borderRight: `2px solid ${theme.palette.primary.main}`,
                  color: iconSelectedColor,
                  '&:hover': {
                    color: iconSelectedColor,
                    bgcolor: theme.palette.mode === ThemeMode.DARK ? 'divider' : 'primary.lighter'
                  }
                }
              }),
              ...(!drawerOpen && {
                '&:hover': {
                  bgcolor: 'transparent'
                },
                '&.Mui-selected': {
                  '&:hover': {
                    bgcolor: 'transparent'
                  },
                  bgcolor: 'transparent'
                }
              })
            }}
            {...(downLG && {
              onClick: () => handlerDrawerOpen(false)
            })}
          >
            {itemIcon && (
              <ListItemIcon
                sx={{
                  minWidth: 28,
                  color: isSelected ? iconSelectedColor : textColor,
                  ...(!drawerOpen && {
                    borderRadius: 1.5,
                    width: 36,
                    height: 36,
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                      bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.lighter'
                    }
                  }),
                  ...(!drawerOpen &&
                    isSelected && {
                    bgcolor: theme.palette.mode === ThemeMode.DARK ? 'primary.900' : 'primary.lighter',
                    '&:hover': {
                      bgcolor: theme.palette.mode === ThemeMode.DARK ? 'primary.darker' : 'primary.lighter'
                    }
                  })
                }}
              >
                {itemIcon}
              </ListItemIcon>
            )}
            {(drawerOpen || (!drawerOpen && level !== 1)) && (
              <ListItemText
                primary={
                  <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
                    {item?.title}
                  </Typography>
                }
              />
            )}
            {/* {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
              <Chip
                color={item.chip.color}
                variant={item.chip.variant}
                size={item.chip.size}
                label={item.chip.label}
                avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
              />
            )} */}
          </ListItemButton>
        </Box>
      ) : (
        <ListItemButton
          onClick={() => navigate(String(item?.url))}
          selected={isSelected}
          {...(isParents && {
            onClick: () => {
              handlerHorizontalActiveItem(item?.id);
            }
          })}
          sx={{
            zIndex: 1201,
            '&:hover': {
              bgcolor: 'transparent'
            },
            ...(isParents && {
              p: 1,
              mr: 1
            }),
            '&.Mui-selected': {
              bgcolor: 'transparent',
              '&:hover': {
                bgcolor: 'transparent'
              }
            }
          }}
        >
          {itemIcon && (
            <ListItemIcon
              sx={{
                minWidth: 28,
                ...(!drawerOpen && {
                  borderRadius: 1.5,
                  width: 28,
                  height: 28,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  '&:hover': {
                    bgcolor: 'transparent'
                  }
                }),
                ...(!drawerOpen &&
                  isSelected && {
                  bgcolor: 'transparent',
                  '&:hover': {
                    bgcolor: 'transparent'
                  }
                })
              }}
            >
              {itemIcon}
            </ListItemIcon>
          )}

          {!itemIcon && (
            <ListItemIcon
              sx={{
                color: isSelected ? 'primary.main' : 'secondary.dark',
                ...(!drawerOpen && {
                  borderRadius: 1.5,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  '&:hover': {
                    bgcolor: 'transparent'
                  }
                }),
                ...(!drawerOpen &&
                  isSelected && {
                  bgcolor: 'transparent',
                  '&:hover': {
                    bgcolor: 'transparent'
                  }
                })
              }}
            >
              <Dot size={4} color={isSelected ? 'primary' : 'secondary'} />
            </ListItemIcon>
          )}
          <ListItemText
            primary={
              <Typography variant="h6" color={isSelected ? 'primary.main' : 'secondary.dark'}>
                {item?.title}
              </Typography>
            }
          />
          {/* {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
            <Chip
              color={item.chip.color}
              variant={item.chip.variant}
              size={item.chip.size}
              label={item.chip.label}
              avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
            />
          )} */}
        </ListItemButton>
      )}
    </>
  );
};

export default NavItem;
