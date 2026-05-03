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
  themeMode: 'light' | 'dark';
  isAuthenticated: boolean;
  addClass: (newClass: Omit<ClassSession, 'id'>) => void;
  updateClass: (id: string, updatedClass: Partial<ClassSession>) => void;
  deleteClass: (id: string) => void;
  setSelectedTrainerId: (id: string | null) => void;
  toggleTheme: () => void;
  setAuthenticated: (value: boolean) => void;
}

const DEFAULT_TRAINERS: Trainer[] = [
  { id: '1', name: '배코치', color: '#ff6d00' },
  { id: '2', name: '이코치', color: '#ffab40' },
  { id: '3', name: '조코치', color: '#ffc107' },
];

export const useStore = create<GymState>()(
  persist(
    (set) => ({
      trainers: DEFAULT_TRAINERS,
      classes: [],
      selectedTrainerId: null,
      themeMode: 'light',
      isAuthenticated: false,
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
      toggleTheme: () => set((state) => ({ themeMode: state.themeMode === 'light' ? 'dark' : 'light' })),
      setAuthenticated: (value) => set({ isAuthenticated: value }),
    }),
    {
      name: 'ddgym-storage',
      partialize: (state) => {
        const result = { ...state };
        // We use a safe way to remove the property without triggering linting errors
        return Object.fromEntries(
          Object.entries(result).filter(([key]) => key !== 'isAuthenticated')
        ) as Omit<GymState, 'isAuthenticated'>;
      },
      merge: (persistedState, currentState) => {
        const merged = { ...currentState, ...(persistedState as Partial<GymState>) };
        if (persistedState && (persistedState as GymState).trainers) {
          merged.trainers = DEFAULT_TRAINERS;
        }
        return merged;
      },
    }
  )
);
