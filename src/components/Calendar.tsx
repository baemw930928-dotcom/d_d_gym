import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import {
  format,
  startOfWeek,
  addDays,
  startOfDay,
  addHours,
  isSameDay,
  parseISO,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { useStore, type ClassSession } from '../store/useStore';
import ClassModal from './ClassModal';

const HOURS = Array.from({ length: 15 }, (_, i) => i + 7); // 7:00 to 21:00

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassSession | null>(null);
  const [initialTime, setInitialTime] = useState<Date | undefined>();

  const { classes, trainers, selectedTrainerId } = useStore();

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const filteredClasses = classes.filter((c) =>
    selectedTrainerId ? c.trainerId === selectedTrainerId : true
  );

  const handleSlotClick = (day: Date, hour: number) => {
    const slotTime = addHours(startOfDay(day), hour);
    setEditingClass(null);
    setInitialTime(slotTime);
    setModalOpen(true);
  };

  const handleClassClick = (e: React.MouseEvent, session: ClassSession) => {
    e.stopPropagation();
    setEditingClass(session);
    setModalOpen(true);
  };

  return (
    <Paper sx={{ p: 2, borderRadius: 4, overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          {format(startDate, 'yyyy년 M월', { locale: ko })}
        </Typography>
        <Box>
          <IconButton onClick={() => setCurrentDate(addDays(currentDate, -7))}>
            <ChevronLeft />
          </IconButton>
          <IconButton onClick={() => setCurrentDate(addDays(currentDate, 7))}>
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ overflowX: 'auto' }}>
        <Box sx={{ minWidth: 800 }}>
          <Grid container spacing={0}>
            {/* Time Column Header */}
            <Grid size={0.5}></Grid>
            {/* Day Headers */}
            {days.map((day) => (
              <Grid size={1.64} key={day.toString()} sx={{ textAlign: 'center', pb: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  {format(day, 'E', { locale: ko })}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: isSameDay(day, new Date()) ? 'primary.main' : 'inherit',
                    fontWeight: 800,
                  }}
                >
                  {format(day, 'd')}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {HOURS.map((hour) => (
            <Grid container spacing={0} key={hour}>
              {/* Hour Label */}
              <Grid size={0.5} sx={{ textAlign: 'right', pr: 1, pt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {hour}:00
                </Typography>
              </Grid>
              {/* Day Slots */}
              {days.map((day) => {
                const session = filteredClasses.find((c) => {
                  const classTime = parseISO(c.startTime);
                  return isSameDay(classTime, day) && classTime.getHours() === hour;
                });
                const trainer = trainers.find((t) => t.id === session?.trainerId);

                return (
                  <Grid
                    size={1.64}
                    key={day.toString() + hour}
                    sx={{
                      height: 80,
                      border: '1px solid rgba(255,255,255,0.05)',
                      position: 'relative',
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' },
                    }}
                    onClick={() => handleSlotClick(day, hour)}
                  >
                    {session && (
                      <Box
                        onClick={(e) => handleClassClick(e, session)}
                        sx={{
                          position: 'absolute',
                          top: 4,
                          left: 4,
                          right: 4,
                          bottom: 4,
                          bgcolor: trainer?.color || 'primary.main',
                          borderRadius: 2,
                          p: 1,
                          boxShadow: `0 4px 12px ${trainer?.color}44`,
                          color: '#fff',
                          zIndex: 1,
                        }}
                      >
                        <Typography variant="caption" sx={{ fontWeight: 800, display: 'block' }}>
                          {session.title}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          {trainer?.name}
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                );
              })}
            </Grid>
          ))}
        </Box>
      </Box>

      <ClassModal
        key={editingClass?.id || initialTime?.toISOString() || 'new'}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        editingClass={editingClass}
        initialTime={initialTime}
      />

      <IconButton
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          bgcolor: 'primary.main',
          color: 'white',
          boxShadow: 4,
          '&:hover': { bgcolor: 'primary.dark' },
        }}
        onClick={() => {
          setEditingClass(null);
          setInitialTime(new Date());
          setModalOpen(true);
        }}
      >
        <Plus />
      </IconButton>
    </Paper>
  );
};

export default Calendar;
