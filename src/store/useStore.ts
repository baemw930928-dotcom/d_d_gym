import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Trainer {
  id: string;
  name: string;
  color: string;
}

export interface ClassSession {
  id: string;
  title: string;
  trainerId: string;
  startTime: string; // ISO string
  duration: number; // minutes
}

interface GymState {
  trainers: Trainer[];
  classes: ClassSession[];
  selectedTrainerId: string | null;
  addClass: (newClass: Omit<ClassSession, 'id'>) => void;
  updateClass: (id: string, updatedClass: Partial<ClassSession>) => void;
  deleteClass: (id: string) => void;
  setSelectedTrainerId: (id: string | null) => void;
}

const DEFAULT_TRAINERS: Trainer[] = [
  { id: '1', name: '김코치', color: '#ff4081' },
  { id: '2', name: '이코치', color: '#7c4dff' },
  { id: '3', name: '박코치', color: '#00e5ff' },
];

export const useStore = create<GymState>()(
  persist(
    (set) => ({
      trainers: DEFAULT_TRAINERS,
      classes: [],
      selectedTrainerId: null,
      addClass: (newClass) =>
        set((state) => ({
          classes: [...state.classes, { ...newClass, id: Math.random().toString(36).substr(2, 9) }],
        })),
      updateClass: (id, updatedClass) =>
        set((state) => ({
          classes: state.classes.map((c) => (c.id === id ? { ...c, ...updatedClass } : c)),
        })),
      deleteClass: (id) =>
        set((state) => ({
          classes: state.classes.filter((c) => c.id !== id),
        })),
      setSelectedTrainerId: (id) => set({ selectedTrainerId: id }),
    }),
    {
      name: 'ddgym-storage',
    }
  )
);
