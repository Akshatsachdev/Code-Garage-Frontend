import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  useTheme,
  alpha,
} from '@mui/material';
import {
  CloudUpload,
  InsertDriveFile,
  Image,
  PictureAsPdf,
  Delete,
  CheckCircle,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface FileItem {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

const FileDropZone: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const theme = useTheme();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  }, []);

  const handleFiles = (fileList: File[]) => {
    const newFiles: FileItem[] = fileList.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: 'uploading' as const,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((fileItem) => {
      const interval = setInterval(() => {
        setFiles(prev => prev.map(f => {
          if (f.id === fileItem.id) {
            const newProgress = Math.min(f.progress + Math.random() * 20, 100);
            return {
              ...f,
              progress: newProgress,
              status: newProgress === 100 ? 'completed' : 'uploading',
            };
          }
          return f;
        }));
      }, 200);

      // Clear interval after completion
      setTimeout(() => {
        clearInterval(interval);
        setFiles(prev => prev.map(f =>
          f.id === fileItem.id ? { ...f, progress: 100, status: 'completed' } : f
        ));
      }, 2000 + Math.random() * 3000);
    });
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image color="primary" />;
    }
    if (file.type === 'application/pdf') {
      return <PictureAsPdf color="error" />;
    }
    return <InsertDriveFile color="action" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      {/* Drop Zone */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Paper
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            p: 6,
            textAlign: 'center',
            border: `2px dashed ${isDragOver ? theme.palette.primary.main : theme.palette.divider}`,
            backgroundColor: isDragOver
              ? alpha(theme.palette.primary.main, 0.1)
              : alpha(theme.palette.background.paper, 0.5),
            borderRadius: 3,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
            },
          }}
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isDragOver ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <CloudUpload
              sx={{
                fontSize: 64,
                color: isDragOver ? theme.palette.primary.main : theme.palette.text.secondary,
                mb: 2,
              }}
            />
          </motion.div>
          
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
            {isDragOver ? 'Drop files here' : 'Upload Your Receipts'}
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Drag and drop your receipt images or PDFs here, or click to browse
          </Typography>
          
          <input
            type="file"
            multiple
            accept="image/*,application/pdf"
            onChange={handleFileInput}
            style={{ display: 'none' }}
            id="file-upload"
          />
          
          <label htmlFor="file-upload">
            <Button
              variant="contained"
              component="span"
              size="large"
              startIcon={<CloudUpload />}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 500,
              }}
            >
              Choose Files
            </Button>
          </label>
          
          <Typography variant="caption" display="block" sx={{ mt: 2, color: 'text.secondary' }}>
            Supported formats: JPG, PNG, PDF • Max size: 10MB per file
          </Typography>
        </Paper>
      </motion.div>

      {/* File List */}
      {files.length > 0 && (
        <Paper sx={{ mt: 3, borderRadius: 2, overflow: 'hidden' }}>
          <Box sx={{ p: 2, backgroundColor: alpha(theme.palette.primary.main, 0.1) }}>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Uploaded Files ({files.length})
            </Typography>
          </Box>
          
          <List sx={{ p: 0 }}>
            <AnimatePresence>
              {files.map((fileItem, index) => (
                <motion.div
                  key={fileItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ListItem
                    sx={{
                      borderBottom: index < files.length - 1 
                        ? `1px solid ${theme.palette.divider}` 
                        : 'none',
                    }}
                  >
                    <ListItemIcon>
                      {fileItem.status === 'completed' ? (
                        <CheckCircle color="success" />
                      ) : (
                        getFileIcon(fileItem.file)
                      )}
                    </ListItemIcon>
                    
                    <ListItemText
                      primary={fileItem.file.name}
                      secondary={
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            {formatFileSize(fileItem.file.size)}
                            {fileItem.status === 'completed' && (
                              <Typography
                                component="span"
                                variant="caption"
                                sx={{ ml: 1, color: 'success.main', fontWeight: 500 }}
                              >
                                • Processed
                              </Typography>
                            )}
                          </Typography>
                          {fileItem.status === 'uploading' && (
                            <LinearProgress
                              variant="determinate"
                              value={fileItem.progress}
                              sx={{ mt: 1, borderRadius: 1 }}
                            />
                          )}
                        </Box>
                      }
                    />
                    
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => removeFile(fileItem.id)}
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default FileDropZone;