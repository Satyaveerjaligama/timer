import { toast } from "sonner";

export interface TimerFormData {
  title: string;
  description: string;
  hours: number;
  minutes: number;
  seconds: number;
}

// added a common function to handle error snackbar
const displayErrorToast = (errorMessage: string): void => {
  toast.error(errorMessage, {
    duration: 5000,
    // displays the snackbar at bottom of the screen for mobile phones and top-right for the desktops
    position: window.innerWidth < 640 ? "bottom-center" : "top-right",
  });
};

export const validateTimerForm = (data: TimerFormData): boolean => {
  const { title, hours, minutes, seconds } = data;

  if (!title.trim()) {
    displayErrorToast("Title is required");
    return false;
  }

  if (title.length > 50) {
    displayErrorToast("Title must be less than 50 characters");
    return false;
  }

  if (hours < 0 || minutes < 0 || seconds < 0) {
    displayErrorToast("Time values cannot be negative");
    return false;
  }

  if (minutes > 59 || seconds > 59) {
    displayErrorToast("Minutes and seconds must be between 0 and 59");
    return false;
  }

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  if (totalSeconds === 0) {
    displayErrorToast("Please set a time greater than 0");
    return false;
  }

  if (totalSeconds > 86400) {
    // 24 hours
    displayErrorToast("Timer cannot exceed 24 hours");
    return false;
  }

  return true;
};
