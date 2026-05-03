# DDGYM Management Tool Blueprint

## Overview
DDGYM Management Tool is a specialized application for fitness centers to manage class schedules across multiple trainers. It provides a shared, intuitive interface for scheduling and tracking sessions.

## Project Outline
- **Name**: 디디짐 (DDGYM)
- **Trainers**: 3 dedicated trainers.
- **Key Features**:
  - Weekly Calendar Grid: Visual schedule of all classes.
  - Shared Access: Trainers can view and modify the schedule.
  - Intuitive Design: Simple class addition/editing via modals.
  - Trainer Filtering: Toggle visibility of specific trainers.
  - Persistent Data: Local browser storage for session-to-session continuity.

## Style & Design
- **Theme**: Dark Mode with vibrant neon accents (Primary: #bb86fc, Secondary: #03dac6).
- **Background**: Subtle noise texture for a premium feel.
- **Shadows**: Multi-layered "lifted" shadows for cards and interactive elements.
- **Typography**: Expressive, high-contrast fonts for clear readability.

## Implementation Plan (Current)
1. **Zustand Store**: Manage `trainers`, `classes`, and `activeFilters`.
2. **MUI Theme Customization**: Create a custom theme provider in `src/styles/theme.ts`.
3. **Calendar Component**: Implement a 7-day grid with hourly slots.
4. **Class Modal**: Create a form for class details (title, trainer, time).
5. **App Integration**: Combine components in `App.tsx`.

## Changelog
- **v0.1.0**: Initial setup, dependency installation, and architecture planning. (Completed)
- **v1.0.0**: Full implementation of Calendar, ClassModal, TrainerFilter, and Zustand store with persistence. Idiomatic React patterns applied to resolve linting issues.
