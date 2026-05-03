import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { useStore } from '../store/useStore';

const TrainerFilter: React.FC = () => {
  const { trainers, selectedTrainerId, setSelectedTrainerId } = useStore();

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 3, flexWrap: 'wrap' }}>
      <Typography variant="body2" sx={{ mr: 1, color: 'text.secondary', fontWeight: 600 }}>
        트레이너 필터:
      </Typography>
      <Chip
        label="전체"
        onClick={() => setSelectedTrainerId(null)}
        variant={selectedTrainerId === null ? 'filled' : 'outlined'}
        color="primary"
        sx={{ fontWeight: 700 }}
      />
      {trainers.map((trainer) => (
        <Chip
          key={trainer.id}
          label={trainer.name}
          onClick={() => setSelectedTrainerId(trainer.id)}
          variant={selectedTrainerId === trainer.id ? 'filled' : 'outlined'}
          sx={{
            borderColor: trainer.color,
            color: selectedTrainerId === trainer.id ? '#fff' : trainer.color,
            backgroundColor: selectedTrainerId === trainer.id ? trainer.color : 'transparent',
            fontWeight: 700,
            '&:hover': {
              backgroundColor: selectedTrainerId === trainer.id ? trainer.color : `${trainer.color}22`,
            },
          }}
        />
      ))}
    </Box>
  );
};

export default TrainerFilter;
