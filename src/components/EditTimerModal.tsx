import React, { useState, useEffect } from "react";
import { useTimerStore } from "../store/useTimerStore";
import { validateTimerForm } from "../utils/validation";
import { Timer } from "../types/timer";
import TimerModal from "./TimerModal";

interface EditTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  timer: Timer;
}

export const EditTimerModal: React.FC<EditTimerModalProps> = ({
  isOpen,
  onClose,
  timer,
}) => {
  const [title, setTitle] = useState(timer.title);
  const [description, setDescription] = useState(timer.description);
  const [hours, setHours] = useState(Math.floor(timer.duration / 3600));
  const [minutes, setMinutes] = useState(
    Math.floor((timer.duration % 3600) / 60)
  );
  const [seconds, setSeconds] = useState(timer.duration % 60);
  const [touched, setTouched] = useState({
    title: false,
    hours: false,
    minutes: false,
    seconds: false,
  });

  const { editTimer } = useTimerStore();

  useEffect(() => {
    if (isOpen) {
      setTitle(timer.title);
      setDescription(timer.description);
      setHours(Math.floor(timer.duration / 3600));
      setMinutes(Math.floor((timer.duration % 3600) / 60));
      setSeconds(timer.duration % 60);
      setTouched({
        title: false,
        hours: false,
        minutes: false,
        seconds: false,
      });
    }
  }, [isOpen, timer]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateTimerForm({ title, description, hours, minutes, seconds })) {
      return;
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    editTimer(timer.id, {
      title: title.trim(),
      description: description.trim(),
      duration: totalSeconds,
    });

    onClose();
  };

  const handleClose = () => {
    onClose();
    setTouched({
      title: false,
      hours: false,
      minutes: false,
      seconds: false,
    });
  };

  const isTimeValid = hours > 0 || minutes > 0 || seconds > 0;
  const isTitleValid = title.trim().length > 0 && title.length <= 50;

  return (
    <TimerModal
      isTimeValid={isTimeValid}
      isTitleValid={isTitleValid}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      touched={touched}
      setTouched={setTouched}
      hours={hours}
      setHours={setHours}
      minutes={minutes}
      setMinutes={setMinutes}
      seconds={seconds}
      setSeconds={setSeconds}
      modalTitle="Edit Timer"
    />
  );
};
