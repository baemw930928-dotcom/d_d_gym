import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, IconButton, Slider } from '@mui/material';
import { ChevronLeft, ChevronRight, Plus, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
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

const HOURS = Array.from({ length: 18 }, (_, i) => i + 7); // 7:00 to 00:00 (next day)

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassSession | null>(null);
  const [initialTime, setInitialTime] = useState<Date | undefined>();
  const [zoom, setZoom] = useState(1); // Zoom level from 0.4 to 1.2

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
    <Paper sx={{ p: { xs: 1, sm: 2 }, borderRadius: 4, overflow: 'hidden' }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, 
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' }, 
        gap: 2,
        mb: 3 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            {format(startDate, 'yyyy년 M월', { locale: ko })}
          </Typography>
          <Box sx={{ ml: 1 }}>
            <IconButton onClick={() => setCurrentDate(addDays(currentDate, -7))} size="small">
              <ChevronLeft size={20} />
            </IconButton>
            <IconButton onClick={() => setCurrentDate(addDays(currentDate, 7))} size="small">
              <ChevronRight size={20} />
            </IconButton>
          </Box>
        </Box>

        {/* Zoom Controls */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center', 
          gap: 2, 
          width: { xs: '100%', sm: 250 }, 
          px: { xs: 1, sm: 0 } 
        }}>
          <ZoomOut size={18} color="gray" />
          <Slider
            size="small"
            value={zoom}
            min={0.4}
            max={1.2}
            step={0.1}
            onChange={(_, newValue) => setZoom(newValue as number)}
            aria-label="Zoom"
            sx={{ color: 'primary.main', flexGrow: 1 }}
          />
          <ZoomIn size={18} color="gray" />
          <IconButton onClick={() => setZoom(1)} size="small" title="Reset Zoom">
            <Maximize size={18} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ 
        overflowX: 'auto', 
        overflowY: 'hidden',
        WebkitOverflowScrolling: 'touch',
        '&::-webkit-scrollbar': { height: 8 },
        '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(0,0,0,0.1)', borderRadius: 4 }
      }}>
        <Box sx={{ 
          minWidth: 800,
          transform: `scale(${zoom})`,
          transformOrigin: 'top left',
          width: `${100 / zoom}%`,
          transition: 'transform 0.2s ease-out, width 0.2s ease-out',
          pb: zoom < 1 ? 0 : 4 // Add some padding when zoomed in
        }}>
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
                const hourSessions = filteredClasses.filter((c) => {
                  const classTime = parseISO(c.startTime);
                  return isSameDay(classTime, day) && classTime.getHours() === hour;
                });

                return (
                  <Grid
                    size={1.64}
                    key={day.toString() + hour}
                    sx={{
                      height: 120, // Increased height to accommodate 3 classes
                      border: '1px solid rgba(0,0,0,0.05)',
                      position: 'relative',
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.01)' },
                    }}
                    onClick={() => handleSlotClick(day, hour)}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: 0.25, // Tighter gap
                      p: 0.25,   // Tighter padding
                      height: '100%',
                      overflow: 'hidden'
                    }}>
                      {hourSessions.map((session) => {
                        const trainer = trainers.find((t) => t.id === session.trainerId);
                        return (
                          <Box
                            key={session.id}
                            onClick={(e) => handleClassClick(e, session)}
                            sx={{
                              bgcolor: trainer?.color || 'primary.main',
                              borderRadius: 1, // Slightly smaller radius
                              p: '2px 4px',    // Surgical padding
                              boxShadow: `0 2px 4px ${trainer?.color}33`,
                              color: '#fff',
                              zIndex: 1,
                              flexShrink: 0,
                            }}
                          >
                            <Typography variant="caption" sx={{ 
                              fontWeight: 800, 
                              display: 'block', 
                              fontSize: '0.68rem', 
                              lineHeight: 1.1,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {session.title}
                            </Typography>
                            <Typography variant="caption" sx={{ 
                              opacity: 0.9, 
                              fontSize: '0.62rem',
                              display: 'block',
                              lineHeight: 1
                            }}>
                              {trainer?.name}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
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
          zIndex: 10,
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
