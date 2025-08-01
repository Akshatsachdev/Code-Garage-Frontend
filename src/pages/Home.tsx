import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  useTheme,
  alpha,
  Avatar,
  Chip,
} from '@mui/material';
import { Grid } from '../components/CustomGrid';
import {
  Receipt,
  AutoAwesome,
  Analytics,
  Security,
  Speed,
  CloudSync,
  Star,
  ArrowForward,
  PlayArrow,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [currentMockup, setCurrentMockup] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();

  const mockupScreens = [
    {
      title: 'Smart Receipt Scanning',
      description: 'AI automatically extracts data from receipts',
      image: '📄',
    },
    {
      title: 'Expense Analytics',
      description: 'Beautiful charts and insights',
      image: '📊',
    },
    {
      title: 'Task Management',
      description: 'Gamified workflow management',
      image: '✅',
    },
  ];

  const features = [
    {
      icon: <AutoAwesome />,
      title: 'AI-Powered Processing',
      description: 'Advanced AI extracts and categorizes receipt data automatically',
      color: 'primary',
    },
    {
      icon: <Analytics />,
      title: 'Smart Analytics',
      description: 'Beautiful charts and insights to track your spending patterns',
      color: 'secondary',
    },
    {
      icon: <Security />,
      title: 'Bank-Level Security',
      description: 'Your financial data is encrypted and protected',
      color: 'success',
    },
    {
      icon: <Speed />,
      title: 'Lightning Fast',
      description: 'Process hundreds of receipts in seconds',
      color: 'info',
    },
    {
      icon: <CloudSync />,
      title: 'Cloud Sync',
      description: 'Access your data anywhere, anytime',
      color: 'warning',
    },
    {
      icon: <Receipt />,
      title: 'Multi-Format Support',
      description: 'Works with images, PDFs, and digital receipts',
      color: 'error',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Small Business Owner',
      avatar: '👩‍💼',
      rating: 5,
      comment: 'Project Raseed has transformed how I manage my business expenses. The AI is incredibly accurate!',
    },
    {
      name: 'Mike Johnson',
      role: 'Freelancer',
      avatar: '👨‍💻',
      rating: 5,
      comment: 'The gamified task management keeps me motivated. Love earning XP for completing expense reports!',
    },
    {
      name: 'Elena Rodriguez',
      role: 'Finance Manager',
      avatar: '👩‍🏫',
      rating: 5,
      comment: 'The analytics dashboard gives us insights we never had before. Highly recommended!',
    },
  ];

  // Rotate mockup screens
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMockup((prev) => (prev + 1) % mockupScreens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [mockupScreens.length]);

  return (
    <Box>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: { xs: 12, md: 16 }, pb: 8, textAlign: 'center' }}>
        <Grid container spacing={6} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Chip
                label="✨ Now with AI-powered insights"
                sx={{
                  mb: 3,
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  fontWeight: 500,
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                }}
              >
                Manage Receipts with AI Intelligence
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ mb: 4, lineHeight: 1.5, fontWeight: 400 }}
              >
                Transform your expense management with AI-powered receipt processing, 
                smart categorization, and beautiful analytics.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Receipt />}
                    onClick={() => navigate('/upload')}
                    sx={{
                      borderRadius: 3,
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                    }}
                  >
                    Get Started Free
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<PlayArrow />}
                    sx={{
                      borderRadius: 3,
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                    }}
                    href="https://drive.google.com/file/d/181pE76Sx4KtSP48fk2gglQFSfRf3zGfC/view"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch Demo
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  height: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMockup}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card
                      sx={{
                        p: 4,
                        textAlign: 'center',
                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                        border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        borderRadius: 4,
                        backdropFilter: 'blur(10px)',
                        maxWidth: 300,
                        mx: 'auto',
                      }}
                    >
                      <Typography variant="h1" sx={{ mb: 2, fontSize: '4rem' }}>
                        {mockupScreens[currentMockup].image}
                      </Typography>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                        {mockupScreens[currentMockup].title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {mockupScreens[currentMockup].description}
                      </Typography>
                    </Card>
                  </motion.div>
                </AnimatePresence>

                {/* Mockup indicators */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 1,
                  }}
                >
                  {mockupScreens.map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: index === currentMockup
                          ? theme.palette.primary.main
                          : alpha(theme.palette.primary.main, 0.3),
                        transition: 'all 0.3s ease',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ py: 8, backgroundColor: alpha(theme.palette.background.paper, 0.5) }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              align="center"
              sx={{ mb: 2, fontWeight: 700 }}
            >
              Powerful Features
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
            >
              Everything you need to streamline your expense management workflow
            </Typography>
          </motion.div>

          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={feature.title}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      p: 3,
                      textAlign: 'center',
                      border: `1px solid ${alpha((theme.palette[feature.color as keyof typeof theme.palette] as any).main, 0.2)}`,
                      '&:hover': {
                        boxShadow: `0 8px 24px ${alpha((theme.palette[feature.color as keyof typeof theme.palette] as any).main, 0.2)}`,
                      },
                      maxWidth: 300,
                      mx: 'auto',
                    }}
                  >
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        backgroundColor: alpha((theme.palette[feature.color as keyof typeof theme.palette] as any).main, 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        color: (theme.palette[feature.color as keyof typeof theme.palette] as any).main,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              align="center"
              sx={{ mb: 2, fontWeight: 700 }}
            >
              Loved by Users
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
            >
              See what our community says about Project Raseed
            </Typography>
          </motion.div>

          <Grid container spacing={4} justifyContent="center">
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={testimonial.name}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card sx={{ height: '100%', p: 3, maxWidth: 300, mx: 'auto' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', mb: 2, justifyContent: 'center' }}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} sx={{ color: theme.palette.secondary.main, fontSize: 20 }} />
                        ))}
                      </Box>
                      <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                        "{testimonial.comment}"
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Avatar sx={{ mr: 2, fontSize: 24 }}>
                          {testimonial.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {testimonial.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 8,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
                Ready to Get Started?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
                Join thousands of users who have transformed their expense management with Project Raseed
              </Typography>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/upload')}
                  sx={{
                    backgroundColor: 'white',
                    color: theme.palette.primary.main,
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: alpha('#ffffff', 0.9),
                    },
                  }}
                >
                  Start Free Trial
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;