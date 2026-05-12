import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

export interface Trainer {
  id: string;
  name: string;
  color: string;
}

export interface ClassSession {
  id: string;
  title: string;
  trainerId: string;
  startTime: string;
  duration: number;
}

interface GymState {
  trainers: Trainer[];
  classes: ClassSession[];
  selectedTrainerId: string | null;
  themeMode: 'light' | 'dark';
  isAuthenticated: boolean;
  isLoading: boolean;
  fetchClasses: () => Promise<void>;
  addClass: (newClass: Omit<ClassSession, 'id'>) => Promise<void>;
  updateClass: (id: string, updatedClass: Partial<ClassSession>) => Promise<void>;
  deleteClass: (id: string) => Promise<void>;
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
      isLoading: false,

      fetchClasses: async () => {
        set({ isLoading: true });
        const { data, error } = await supabase
          .from('classes')
          .select('*')
          .order('start_time', { ascending: true });
        if (!error && data) {
          set({
            classes: data.map((c) => ({
              id: c.id,
              title: c.title,
              trainerId: c.trainer_id,
              startTime: c.start_time,
              duration: c.duration,
            })),
          });
        }
        set({ isLoading: false });
      },

      addClass: async (newClass) => {
        const id = Math.random().toString(36).substr(2, 9);
        const { error } = await supabase.from('classes').insert({
          id,
          title: newClass.title,
          trainer_id: newClass.trainerId,
          start_time: newClass.startTime,
          duration: newClass.duration,
        });
        if (!error) {
          set((state) => ({
            classes: [...state.classes, { ...newClass, id }],
          }));
        }
      },

      updateClass: async (id, updatedClass) => {
        const { error } = await supabase.from('classes').update({
          ...(updatedClass.title && { title: updatedClass.title }),
          ...(updatedClass.trainerId && { trainer_id: updatedClass.trainerId }),
          ...(updatedClass.startTime && { start_time: updatedClass.startTime }),
        }).eq('id', id);
        if (!error) {
          set((state) => ({
            classes: state.classes.map((c) => (c.id === id ? { ...c, ...updatedClass } : c)),
          }));
        }
      },

      deleteClass: async (id) => {
        const { error } = await supabase.from('classes').delete().eq('id', id);
        if (!error) {
          set((state) => ({
            classes: state.classes.filter((c) => c.id !== id),
          }));
        }
      },

      setSelectedTrainerId: (id) => set({ selectedTrainerId: id }),
      toggleTheme: () => set((state) => ({ themeMode: state.themeMode === 'light' ? 'dark' : 'light' })),
      setAuthenticated: (value) => set({ isAuthenticated: value }),
    }),
    {
      name: 'ddgym-storage',
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) =>
            ['themeMode', 'selectedTrainerId'].includes(key)
          )
        ) as any,
    }
  )
);
