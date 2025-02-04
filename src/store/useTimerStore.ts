import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { Timer } from "../types/timer";
import storage from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import { toast } from "sonner";
import { TimerAudio } from "../utils/audio";

const initialState = {
  timers: [] as Timer[],
};

const timerAudio = TimerAudio.getInstance();

const stopAudio = () => {
  timerAudio.stop();
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    addTimer: (state, action) => {
      state.timers.push({
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      });
    },
    deleteTimer: (state, action) => {
      state.timers = state.timers.filter(
        (timer) => timer.id !== action.payload
      );
    },
    toggleTimer: (state, action) => {
      const timer = state.timers.find((timer) => timer.id === action.payload);
      if (timer) {
        timer.isRunning = !timer.isRunning;
      }
    },
    updateTimer: (state, action) => {
      const timer = state.timers.find((timer) => timer.id === action.payload);
      if (timer && timer.isRunning) {
        timer.remainingTime -= 1;
        timer.isRunning = timer.remainingTime > 0;
        if (!timer.isRunning) {
          timerAudio.play().catch(console.error);
          toast.success(`Timer "${timer.title}" has ended!`, {
            duration: 5000,
            action: {
              label: "Dismiss",
              onClick: stopAudio, //Resolved the console error when the snack bar's dismiss button is clicked
            },
            // displays the snackbar at bottom of the screen for mobile phones and top-right for the desktops
            position: window.innerWidth < 640 ? "bottom-center" : "top-right",
          });
        }
      }
    },
    restartTimer: (state, action) => {
      const timer = state.timers.find((timer) => timer.id === action.payload);
      if (timer) {
        timer.remainingTime = timer.duration;
        timer.isRunning = false;
      }
    },
    editTimer: (state, action) => {
      const timer = state.timers.find(
        (timer) => timer.id === action.payload.id
      );
      if (timer) {
        Object.assign(timer, action.payload.updates);
        timer.remainingTime = action.payload.updates.duration || timer.duration;
        timer.isRunning = false;
      }
    },
  },
});

// adding redux persist so that data won't get cleared when refreshed
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, timerSlice.reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export { store };

export const {
  addTimer,
  deleteTimer,
  toggleTimer,
  updateTimer,
  restartTimer,
  editTimer,
} = timerSlice.actions;

export const useTimerStore = () => {
  const dispatch = useDispatch();
  const timers = useSelector((state: { timers: Timer[] }) => state.timers);

  return {
    timers,
    addTimer: (timer: Omit<Timer, "id" | "createdAt">) =>
      dispatch(addTimer(timer)),
    deleteTimer: (id: string) => dispatch(deleteTimer(id)),
    toggleTimer: (id: string) => dispatch(toggleTimer(id)),
    updateTimer: (id: string) => dispatch(updateTimer(id)),
    restartTimer: (id: string) => dispatch(restartTimer(id)),
    editTimer: (id: string, updates: Partial<Timer>) =>
      dispatch(editTimer({ id, updates })),
  };
};
