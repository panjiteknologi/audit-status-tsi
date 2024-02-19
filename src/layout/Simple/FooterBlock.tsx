// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Container, Divider, Grid, Link, Stack, Typography } from '@mui/material';

// third party
import { motion } from 'framer-motion';

// project import
import { ThemeMode } from '@/config';

// link - custom style
const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  },
  '&:active': {
    color: theme.palette.primary.main
  }
}));

// ==============================|| LANDING - FOOTER PAGE ||============================== //

const FooterBlock = () => {
  const theme = useTheme();
  const textColor = theme.palette.mode === ThemeMode.DARK ? 'text.primary' : 'background.paper';

  const frameworks = [
    { title: 'Tools', link: '#' },
    {
      title: 'Framework',
      link: '#'
    },
    {
      title: 'Accompaniment',
      link: '#'
    },
    {
      title: 'Consultant',
      link: '#'
    }
  ];

  return (
    <>
      <Box sx={{ pt: 10, pb: 10, bgcolor: theme.palette.grey.A700 }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant='h4' sx={{ color: 'white' }}>
                      CIS Logo
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 400, color: theme.palette.common.white }}>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto sint ipsum accusantium enim necessitatibus illo natus ex? Rem, id, magni dolores beatae, iusto laborum placeat reprehenderit reiciendis inventore quam repellat.
                    </Typography>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={{ xs: 5, md: 2 }}>
                <Grid item xs={6} sm={3}>
                  <Stack spacing={{ xs: 3, md: 5 }}>
                    <Typography
                      variant="h5"
                      color={textColor}
                      sx={{ fontWeight: 500 }}
                    >
                      Help
                    </Typography>
                    <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                      <FooterLink href="#" underline="none">
                        Contact Us
                      </FooterLink>
                      <FooterLink href="#" underline="none">
                        Pricing
                      </FooterLink>
                      <FooterLink href="#" underline="none">
                        Change Log
                      </FooterLink>
                      <FooterLink href="#" underline="none">
                        Support
                      </FooterLink>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Stack spacing={{ xs: 3, md: 5 }}>
                    <Typography
                      variant="h5"
                      color={textColor}
                      sx={{ fontWeight: 500 }}
                    >
                      Help
                    </Typography>
                    <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                      <FooterLink href="#" underline="none">
                        License
                      </FooterLink>
                      <FooterLink href="#" underline="none">
                        Refund Policy
                      </FooterLink>
                      <FooterLink href="#" underline="none">
                        Submit a Request
                      </FooterLink>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Stack spacing={{ xs: 3, md: 5 }}>
                    <Typography
                      variant="h5"
                      color={textColor}
                      sx={{ fontWeight: 500 }}
                    >
                      Eco-System
                    </Typography>
                    <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                      {frameworks.map((item, index) => (
                        <FooterLink
                          href={item.link}
                          underline="none"
                          key={index}
                        >
                          {item.title}
                        </FooterLink>
                      ))}
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Stack spacing={{ xs: 3, md: 5 }}>
                    <Typography
                      variant="h5"
                      color={textColor}
                      sx={{ fontWeight: 500 }}
                    >
                      More Products
                    </Typography>
                    <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                      <FooterLink href="#" underline="none">
                        Panggil Aku
                      </FooterLink>
                      <FooterLink href="#" underline="none">
                        JIT
                      </FooterLink>
                      <FooterLink href="#" underline="none">
                        Cyber Patrol
                      </FooterLink>
                      <FooterLink href="#" underline="none">
                        Associate Management
                      </FooterLink>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Divider sx={{ borderColor: 'grey.700' }} />
      <Box
        sx={{
          py: 1.5,
          bgcolor: theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[50] : theme.palette.grey[800]
        }}
      >
        <Container>
          <Stack justifyContent={'center'} alignItems={'center'}>
            <Typography variant="subtitle2" color="grey">
              © 2024 CIS All Rights Reserved
            </Typography>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default FooterBlock;
