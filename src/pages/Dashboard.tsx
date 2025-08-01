import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import { Grid } from '../components/CustomGrid';
import {
  TrendingUp,
  Receipt,
  Category,
  AccessTime,
  Warning,
  CheckCircle,
  Info,
  AttachMoney,
  ShoppingCart,
  DirectionsCar,
  Restaurant,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import StatCard from '../components/StatCard';
import {
  spendingData,
  categoryData,
  recentUploads,
  smartInsights,
  userStats,
} from '../data/mockData';

const Dashboard: React.FC = () => {
  const theme = useTheme();

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
  ];

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 10, md: 12 }, pb: 8, textAlign: 'center' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 1,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Dashboard
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Your expense management overview
          </Typography>
        </Box>
      </motion.div>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 6, justifyContent: 'center' }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Expenses"
            value={`$${userStats.totalExpenses.toLocaleString()}`}
            icon={<AttachMoney />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Receipts Processed"
            value={userStats.receiptsProcessed}
            icon={<Receipt />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Categories"
            value={userStats.categoriesCreated}
            icon={<Category />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Time Saved"
            value={`${userStats.timeSaved}h`}
            icon={<AccessTime />}
            color="info"
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={4} sx={{ mb: 6, justifyContent: 'center' }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, height: 400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Spending Trends
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spendingData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke={theme.palette.primary.main}
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: 400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Category Breakdown
            </Typography>
            <ResponsiveContainer width="300%" height="80%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: 400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Recent Uploads
            </Typography>
            <List sx={{ width: '100%', textAlign: 'left' }}>
              {recentUploads.slice(0, 5).map((upload) => (
                <ListItem key={upload.id}>
                  <ListItemIcon>
                    <Receipt />
                  </ListItemIcon>
                  <ListItemText
                    primary={upload.fileName}
                    secondary={`$${upload.amount} - ${upload.category}`}
                  />
                  <Chip
                    label={upload.status}
                    size="small"
                    color={upload.status === 'processed' ? 'success' : 'warning'}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: 400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Smart Insights
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', textAlign: 'left' }}>
              {smartInsights.map((insight) => (
                <Card
                  key={insight.id}
                  sx={{
                    p: 2,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Info sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {insight.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {insight.description}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;