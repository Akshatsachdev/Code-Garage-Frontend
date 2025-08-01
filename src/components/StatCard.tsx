import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  alpha,
  IconButton,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  children?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'primary',
  children,
}) => {
  const theme = useTheme();
  
  const colorValue = theme.palette[color].main;
  const lightColorValue = alpha(colorValue, 0.1);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        sx={{
          height: '100%',
          position: 'relative',
          overflow: 'visible',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${colorValue}, ${alpha(colorValue, 0.7)})`,
            borderRadius: '16px 16px 0 0',
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {icon && (
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: lightColorValue,
                    color: colorValue,
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {icon}
                </Box>
              )}
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 500, mb: 0.5 }}
                >
                  {title}
                </Typography>
                {trend && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: trend.isPositive ? 'success.main' : 'error.main',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    >
                      {trend.isPositive ? '+' : ''}{trend.value}%
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ ml: 0.5 }}
                    >
                      vs last month
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <MoreVert fontSize="small" />
            </IconButton>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              mb: subtitle ? 1 : 2,
            }}
          >
            {value}
          </Typography>

          {subtitle && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              {subtitle}
            </Typography>
          )}

          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;