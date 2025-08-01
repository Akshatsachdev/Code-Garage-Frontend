import React, { useState, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  IconButton,
  useTheme,
  alpha,
  Button,
} from '@mui/material';
import {
  Add,
  Flag,
  DateRange,
  MoreVert,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { initialTasks } from '../data/mockData';

interface Task {
  id: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  tags: string[];
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface TasksState {
  [key: string]: Column;
}

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<TasksState>(initialTasks);
  const [xpPoints, setXpPoints] = useState(1250);
  const theme = useTheme();

  const handleDragEnd = useCallback((result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = tasks[source.droppableId];
    const finish = tasks[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.tasks);
      const [reorderedTask] = newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, reorderedTask);

      const newColumn = {
        ...start,
        tasks: newTaskIds,
      };

      setTasks({
        ...tasks,
        [newColumn.id]: newColumn,
      });
      return;
    }

    // Moving from one column to another
    const startTaskIds = Array.from(start.tasks);
    const [movedTask] = startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      tasks: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.tasks);
    finishTaskIds.splice(destination.index, 0, movedTask);
    const newFinish = {
      ...finish,
      tasks: finishTaskIds,
    };

    setTasks({
      ...tasks,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    });

    // Trigger confetti and XP gain when moving to "done"
    if (destination.droppableId === 'done' && source.droppableId !== 'done') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.success.main],
      });
      
      setXpPoints(prev => prev + 50);
      
      // Show XP notification
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFD700', '#FFA500'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFD700', '#FFA500'],
        });
      }, 500);
    }
  }, [tasks, theme]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return theme.palette.error.main;
      case 'medium':
        return theme.palette.warning.main;
      case 'low':
        return theme.palette.success.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getColumnColor = (columnId: string) => {
    switch (columnId) {
      case 'todo':
        return theme.palette.info.main;
      case 'inprogress':
        return theme.palette.warning.main;
      case 'done':
        return theme.palette.success.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* XP Display */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          sx={{
            p: 2,
            mb: 3,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Task Manager
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                XP Points:
              </Typography>
              <motion.div
                key={xpPoints}
                initial={{ scale: 1.2, color: theme.palette.secondary.main }}
                animate={{ scale: 1, color: theme.palette.text.primary }}
                transition={{ duration: 0.3 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {xpPoints}
                </Typography>
              </motion.div>
            </Box>
          </Box>
        </Paper>
      </motion.div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
            minHeight: '70vh',
          }}
        >
          {Object.values(tasks).map((column, columnIndex) => (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: columnIndex * 0.1 }}
            >
              <Paper
                sx={{
                  p: 2,
                  height: 'fit-content',
                  minHeight: '500px',
                  borderRadius: 2,
                  border: `2px solid ${alpha(getColumnColor(column.id), 0.2)}`,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: getColumnColor(column.id),
                        mr: 1,
                      }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {column.title}
                    </Typography>
                    <Chip
                      label={column.tasks.length}
                      size="small"
                      sx={{
                        ml: 1,
                        backgroundColor: alpha(getColumnColor(column.id), 0.1),
                        color: getColumnColor(column.id),
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                  <IconButton size="small">
                    <Add />
                  </IconButton>
                </Box>

                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{
                        minHeight: '400px',
                        backgroundColor: snapshot.isDraggingOver
                          ? alpha(getColumnColor(column.id), 0.05)
                          : 'transparent',
                        borderRadius: 1,
                        transition: 'background-color 0.2s ease',
                      }}
                    >
                      <AnimatePresence>
                        {column.tasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <motion.div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Paper
                                  sx={{
                                    p: 2,
                                    mb: 2,
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    backgroundColor: snapshot.isDragging
                                      ? alpha(theme.palette.primary.main, 0.1)
                                      : theme.palette.background.paper,
                                    border: snapshot.isDragging
                                      ? `2px solid ${theme.palette.primary.main}`
                                      : '1px solid transparent',
                                    boxShadow: snapshot.isDragging
                                      ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
                                      : undefined,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                      boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.1)}`,
                                    },
                                  }}
                                >
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                    <Flag
                                      sx={{
                                        fontSize: 16,
                                        color: getPriorityColor(task.priority),
                                      }}
                                    />
                                    <IconButton size="small">
                                      <MoreVert fontSize="small" />
                                    </IconButton>
                                  </Box>

                                  <Typography
                                    variant="body1"
                                    sx={{
                                      fontWeight: 500,
                                      mb: 2,
                                      lineHeight: 1.4,
                                    }}
                                  >
                                    {task.content}
                                  </Typography>

                                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <DateRange sx={{ fontSize: 14, color: 'text.secondary', mr: 0.5 }} />
                                    <Typography variant="caption" color="text.secondary">
                                      {formatDate(task.dueDate)}
                                    </Typography>
                                  </Box>

                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {task.tags.map((tag) => (
                                      <Chip
                                        key={tag}
                                        label={tag}
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                          fontSize: '0.7rem',
                                          height: 24,
                                        }}
                                      />
                                    ))}
                                  </Box>
                                </Paper>
                              </motion.div>
                            )}
                          </Draggable>
                        ))}
                      </AnimatePresence>
                      {provided.placeholder}
                      
                      {column.tasks.length === 0 && (
                        <Box
                          sx={{
                            p: 3,
                            textAlign: 'center',
                            color: 'text.secondary',
                            fontStyle: 'italic',
                          }}
                        >
                          No tasks yet
                        </Box>
                      )}
                    </Box>
                  )}
                </Droppable>
              </Paper>
            </motion.div>
          ))}
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default KanbanBoard;