import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  IconButton,
} from '@mui/material';
import { X } from 'lucide-react';
import { useStore, ClassSession } from '../store/useStore';
import { format } from 'date-fns';

interface ClassModalProps {
  open: boolean;
  onClose: () => void;
  editingClass?: ClassSession | null;
  initialTime?: Date;
}

interface FormState {
  title: string;
  trainerId: string;
  date: string;
  time: string;
}

const ClassModal: React.FC<ClassModalProps> = ({ open, onClose, editingClass, initialTime }) => {
  const { trainers, addClass, updateClass, deleteClass } = useStore();
  
  const [formData, setFormData] = useState<FormState>(() => {
    if (editingClass) {
      const d = new Date(editingClass.startTime);
      return {
        title: editingClass.title,
        trainerId: editingClass.trainerId,
        date: format(d, 'yyyy-MM-dd'),
        time: format(d, 'HH:mm'),
      };
    } else if (initialTime) {
      return {
        title: '',
        trainerId: trainers[0]?.id || '',
        date: format(initialTime, 'yyyy-MM-dd'),
        time: format(initialTime, 'HH:mm'),
      };
    }
    return {
      title: '',
      trainerId: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '10:00',
    };
  });

  const handleSave = () => {
    const startTime = new Date(`${formData.date}T${formData.time}`).toISOString();
    if (editingClass) {
      updateClass(editingClass.id, {
        title: formData.title,
        trainerId: formData.trainerId,
        startTime,
      });
    } else {
      addClass({
        title: formData.title,
        trainerId: formData.trainerId,
        startTime,
        duration: 60,
      });
    }
    onClose();
  };

  const handleDelete = () => {
    if (editingClass) {
      deleteClass(editingClass.id);
      onClose();
    }
  };

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {editingClass ? '수업 수정' : '새 수업 예약'}
        <IconButton onClick={onClose} size="small">
          <X size={20} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="수업명"
            fullWidth
            value={formData.title}
            onChange={handleChange('title')}
            placeholder="예: PT 수업, 요가 등"
          />
          <TextField
            select
            label="트레이너"
            fullWidth
            value={formData.trainerId}
            onChange={handleChange('trainerId')}
          >
            {trainers.map((t) => (
              <MenuItem key={t.id} value={t.id}>
                {t.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="날짜"
            type="date"
            fullWidth
            value={formData.date}
            onChange={handleChange('date')}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="시간"
            type="time"
            fullWidth
            value={formData.time}
            onChange={handleChange('time')}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        {editingClass && (
          <Button color="error" onClick={handleDelete} sx={{ mr: 'auto' }}>
            삭제
          </Button>
        )}
        <Button onClick={onClose} variant="outlined" color="inherit">
          취소
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={!formData.title}>
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClassModal;
