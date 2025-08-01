// Profile.tsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  Phone,
  Email,
  LocationOn,
  CalendarToday,
  Star,
  TrendingUp,
  EmojiEvents,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate about financial organization and leveraging AI to streamline expense management.',
    company: 'TechCorp Inc.',
    role: 'Senior Product Manager',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const stats = [
    { icon: <TrendingUp />, label: 'Receipts Processed', value: '1,247' },
    { icon: <EmojiEvents />, label: 'Money Saved', value: '$12,450' },
    { icon: <Star />, label: 'Accuracy Rate', value: '98.5%' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Profile
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Manage your account settings and preferences
        </Typography>
      </motion.div>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mt: 2 }}>
        {/* Profile Info */}
        <Box sx={{ flex: { md: '2' } }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Card>
                    <CardHeader
                        title="Basic Information"
                        action={
                            <Box>
                                {isEditing ? (
                                    <>
                                        <Tooltip title="Cancel">
                                            <IconButton onClick={handleCancel}>
                                                <Cancel />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Save">
                                            <IconButton onClick={handleSave}>
                                                <Save />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                ) : (
                                    <Tooltip title="Edit">
                                        <IconButton onClick={() => setIsEditing(true)}>
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Box>
                        }
                    />
                    <CardContent>
                        <Box display="flex" alignItems="center" gap={2} mb={3}>
                            <Avatar sx={{ width: 64, height: 64 }}>
                                {formData.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                            </Avatar>
                            <Box>
                                <Typography variant="h6">{formData.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {formData.role} at {formData.company}
                                </Typography>
                                <Chip label="Level 5 Member" size="small" sx={{ mt: 1 }} />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                            {[
                                { id: 'name', label: 'Full Name', icon: <Edit /> },
                                { id: 'email', label: 'Email', icon: <Email /> },
                                { id: 'phone', label: 'Phone Number', icon: <Phone /> },
                                { id: 'location', label: 'Location', icon: <LocationOn /> },
                            ].map((field) => (
                                <TextField
                                    key={field.id}
                                    fullWidth
                                    label={field.label}
                                    value={(formData as any)[field.id]}
                                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                                                {field.icon}
                                            </Box>
                                        ),
                                    }}
                                    disabled={!isEditing}
                                />
                            ))}
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                label="Bio"
                                value={formData.bio}
                                multiline
                                rows={3}
                                onChange={(e) => handleInputChange('bio', e.target.value)}
                                disabled={!isEditing}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </motion.div>
        </Box>

        {/* Statistics */}
        <Box sx={{ flex: { md: '1' } }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader title="User Stats" />
              <CardContent>
                {stats.map((s, i) => (
                  <Box key={i} display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      {s.icon}
                      <Typography>{s.label}</Typography>
                    </Box>
                    <Typography fontWeight={600}>{s.value}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>

            <Card sx={{ mt: 4 }}>
              <CardHeader title="Account Info" />
              <CardContent>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography color="text.secondary">Member since</Typography>
                  <Typography>Jan 2024</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography color="text.secondary">Last login</Typography>
                  <Typography>Today at 9:24 AM</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography color="text.secondary">Plan</Typography>
                  <Chip label="Premium" color="secondary" size="small" />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
