import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  useTheme,
  alpha,
  Divider,
} from '@mui/material';
import {
  GitHub,
  Twitter,
  LinkedIn,
  Receipt,
  Favorite,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const theme = useTheme();

  const socialLinks = [
    { icon: GitHub, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: LinkedIn, href: '#', label: 'LinkedIn' },
  ];

  const footerLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Support', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 6,
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(10px)',
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr' },
            gap: 4,
            mb: 4,
          }}
        >
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Receipt sx={{ mr: 1, color: theme.palette.primary.main, fontSize: 28 }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Project Raseed
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, maxWidth: 300, lineHeight: 1.6 }}
            >
              Transform your receipt management with AI-powered insights, automated categorization, 
              and smart expense tracking. Built with Google-quality design principles.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    component={Link}
                    href={social.href}
                    sx={{
                      color: theme.palette.text.secondary,
                      '&:hover': {
                        color: theme.palette.primary.main,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      },
                    }}
                  >
                    <social.icon />
                  </IconButton>
                </motion.div>
              ))}
            </Box>
          </motion.div>

          {/* Product Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Product
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Features', 'Pricing', 'API', 'Integrations', 'Updates'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: 'primary.main',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </motion.div>

          {/* Company Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['About', 'Blog', 'Careers', 'Press', 'Partners'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: 'primary.main',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </motion.div>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              © 2025 Project Raseed. Made with
            </Typography>
            <Favorite
              sx={{
                mx: 0.5,
                fontSize: 16,
                color: theme.palette.error.main,
                animation: 'heartbeat 1.5s ease-in-out infinite',
                '@keyframes heartbeat': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.1)' },
                  '100%': { transform: 'scale(1)' },
                },
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Code Garage Team
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': {
                    color: 'primary.main',
                    textDecoration: 'underline',
                  },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;