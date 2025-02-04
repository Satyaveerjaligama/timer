import { X, Clock } from "lucide-react";
import Button from "./Button";

interface Touched {
  title: boolean;
  hours: boolean;
  minutes: boolean;
  seconds: boolean;
}

interface TimerModalProps {
  isTitleValid: boolean;
  isTimeValid: boolean;
  modalTitle: string;
  touched: Touched;
  setTouched: (data: Touched) => void;
  title: string;
  setTitle: (newTitle: string) => void;
  description: string;
  setDescription: (newDescription: string) => void;
  hours: number;
  setHours: (updatedHours: number) => void;
  minutes: number;
  setMinutes: (updatedMinutes: number) => void;
  seconds: number;
  setSeconds: (updatesSeconds: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSubmit: (e: any) => void;
  handleClose: () => void;
}

/*
Refactored the code to use a single modal component for both adding and editing timers.
This modal component can handle both Add new Timer and Edit timer
*/
const TimerModal = (props: TimerModalProps) => {
  const {
    handleClose,
    handleSubmit,
    isTitleValid,
    isTimeValid,
    touched,
    setTouched,
    title,
    setTitle,
    description,
    setDescription,
    hours,
    setHours,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
    modalTitle,
  } = props;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">{modalTitle}</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setTouched({ ...touched, title: true })}
              maxLength={50}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                touched.title && !isTitleValid
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter timer title"
            />
            {touched.title && !isTitleValid && (
              <p className="mt-1 text-sm text-red-500">
                Title is required and must be less than 50 characters
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {title.length}/50 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter timer description (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Duration <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Hours
                </label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={hours}
                  onChange={(e) =>
                    setHours(Math.min(23, parseInt(e.target.value) || 0))
                  }
                  onBlur={() => setTouched({ ...touched, hours: true })}
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Minutes
                </label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) =>
                    setMinutes(Math.min(59, parseInt(e.target.value) || 0))
                  }
                  onBlur={() => setTouched({ ...touched, minutes: true })}
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Seconds
                </label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={seconds}
                  onChange={(e) =>
                    setSeconds(Math.min(59, parseInt(e.target.value) || 0))
                  }
                  onBlur={() => setTouched({ ...touched, seconds: true })}
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            {touched.hours &&
              touched.minutes &&
              touched.seconds &&
              !isTimeValid && (
                <p className="mt-2 text-sm text-red-500">
                  Please set a duration greater than 0
                </p>
              )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              // removed the disabled condition here, so that user can click and get error snackbar when he submits invalid data
              buttonLabel="Cancel"
              onClick={handleClose}
              variant="outlined"
            />
            <Button type="submit" buttonLabel="Save Changes" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimerModal;
