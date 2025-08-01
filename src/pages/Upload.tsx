import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import { Grid } from '../components/CustomGrid';
import {
  CloudUpload,
  AutoAwesome,
  Speed,
  Security,
  CheckCircle,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import FileDropZone from '../components/FileDropZone';

const Upload: React.FC = () => {
  const theme = useTheme();

  const benefits = [
    {
      icon: <AutoAwesome />,
      title: 'AI-Powered Processing',
      description: 'Automatically extract data from receipts with 99.5% accuracy',
      color: 'primary',
    },
    {
      icon: <Speed />,
      title: 'Instant Results',
      description: 'Get processed results in seconds, not minutes',
      color: 'success',
    },
    {
      icon: <Security />,
      title: 'Secure Upload',
      description: 'Your data is encrypted and protected during upload',
      color: 'warning',
    },
  ];

  const supportedFormats = [
    { format: 'JPEG/JPG', description: 'High-quality receipt photos' },
    { format: 'PNG', description: 'Crystal clear receipt images' },
    { format: 'PDF', description: 'Digital receipts and invoices' },
    { format: 'HEIC', description: 'iPhone camera format' },
  ];

  const processingSteps = [
    { step: 1, title: 'Upload', description: 'Drop your receipts' },
    { step: 2, title: 'AI Scan', description: 'AI extracts data' },
    { step: 3, title: 'Categorize', description: 'Auto-categorization' },
    { step: 4, title: 'Review', description: 'Verify and approve' },
  ];

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 10, md: 12 }, pb: 8 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip
            label="🚀 Powered by Advanced AI"
            sx={{
              mb: 3,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              fontWeight: 500,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Upload Your Receipts
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
          >
            Transform your paper receipts into structured data with our AI-powered processing engine.
            Fast, accurate, and secure.
          </Typography>
        </Box>
      </motion.div>

      {/* Main Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <FileDropZone />
        </Box>
      </motion.div>

      {/* Benefits Section */}
      <Box sx={{ mt: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 4, fontWeight: 600 }}
          >
            Why Choose Our Upload System?
          </Typography>
        </motion.div>

        <Grid container spacing={4} justifyContent="center">
          {benefits.map((benefit, index) => (
            <Grid item xs={12} md={4} key={benefit.title}>
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
                    border: `1px solid ${alpha((theme.palette[benefit.color as keyof typeof theme.palette] as any).main, 0.2)}`,
                    '&:hover': {
                      boxShadow: `0 8px 24px ${alpha((theme.palette[benefit.color as keyof typeof theme.palette] as any).main, 0.2)}`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      backgroundColor: alpha((theme.palette[benefit.color as keyof typeof theme.palette] as any).main, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      color: (theme.palette[benefit.color as keyof typeof theme.palette] as any).main,
                    }}
                  >
                    {benefit.icon}
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Processing Steps & Supported Formats */}
      <Grid container spacing={6} sx={{ mt: 6 }} justifyContent="center">
        {/* Processing Steps */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card sx={{ p: 4, height: '100%', textAlign: 'center' }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                How It Works
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {processingSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          backgroundColor: theme.palette.primary.main,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 600,
                          mr: 3,
                        }}
                      >
                        {step.step}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {step.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {step.description}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Card>
          </motion.div>
        </Grid>

        {/* Supported Formats */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card sx={{ p: 4, height: '100%', textAlign: 'center' }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Supported Formats
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {supportedFormats.map((format, index) => (
                  <motion.div
                    key={format.format}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: alpha(theme.palette.success.main, 0.1),
                        border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                      }}
                    >
                      <CheckCircle
                        sx={{
                          color: theme.palette.success.main,
                          mr: 2,
                          fontSize: 20,
                        }}
                      />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {format.format}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {format.description}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </Box>

              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.info.main, 0.1),
                  border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  <strong>Maximum file size:</strong> 10MB per file<br />
                  <strong>Batch upload:</strong> Up to 50 files at once<br />
                  <strong>Processing time:</strong> 2-5 seconds per receipt
                </Typography>
              </Box>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Upload;