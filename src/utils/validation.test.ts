import { describe, it, expect, vi, beforeEach } from "vitest";
import { validateTimerForm } from "./validation";
import { toast } from "sonner";

// mocking toast.error
vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

// Testsuite that contains testcases related to timer form validations
describe("Timer Form validation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Empty Title", () => {
    const formData = {
      title: "",
      description: "",
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    expect(validateTimerForm(formData)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Title is required",
      expect.any(Object) // As we know, toast position is not constant value and will be changed based on the screen size. We are using expect.any(Object)
    );
  });

  it("Blank Title", () => {
    const formData = {
      title: " ",
      description: "",
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    expect(validateTimerForm(formData)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Title is required",
      expect.any(Object)
    );
  });

  it("Title with more than 50 characters", () => {
    const formData = {
      title: "A".repeat(51),
      description: "",
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    expect(validateTimerForm(formData)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Title must be less than 50 characters",
      expect.any(Object)
    );
  });

  it("Negative value for hours", () => {
    const formData = {
      title: "Title",
      description: "",
      hours: -1,
      minutes: 0,
      seconds: 0,
    };
    expect(validateTimerForm(formData)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Time values cannot be negative",
      expect.any(Object)
    );
  });

  it("Negative value for minutes", () => {
    const formData = {
      title: "Title",
      description: "",
      hours: 0,
      minutes: -1,
      seconds: 0,
    };
    expect(validateTimerForm(formData)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Time values cannot be negative",
      expect.any(Object)
    );
  });

  it("Negative value for seconds", () => {
    const formData = {
      title: "Title",
      description: "",
      hours: 0,
      minutes: 0,
      seconds: -1,
    };
    expect(validateTimerForm(formData)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Time values cannot be negative",
      expect.any(Object)
    );
  });

  it("Minutes greater than 59", () => {
    const formData = {
      title: "Title",
      description: "",
      hours: 0,
      minutes: 60,
      seconds: 0,
    };
    expect(validateTimerForm(formData)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Minutes and seconds must be between 0 and 59",
      expect.any(Object)
    );
  });

  it("Seconds greater than 59", () => {
    const formData = {
      title: "Title",
      description: "",
      hours: 0,
      minutes: 0,
      seconds: 60,
    };
    expect(validateTimerForm(formData)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Minutes and seconds must be between 0 and 59",
      expect.any(Object)
    );
  });

  it("Total time zero", () => {
    const formData = {
      title: "Title",
      description: "",
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    expect(validateTimerForm(formData)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Please set a time greater than 0",
      expect.any(Object)
    );
  });

  it("Total time more than 24 hours", () => {
    const formData = {
      title: "Title",
      description: "",
      hours: 24,
      minutes: 1,
      seconds: 1,
    };
    expect(validateTimerForm(formData)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Timer cannot exceed 24 hours",
      expect.any(Object)
    );
  });

  it("Valid Form data with description", () => {
    const formData = {
      title: "Title",
      description: "Description",
      hours: 1,
      minutes: 30,
      seconds: 15,
    };
    expect(validateTimerForm(formData)).toBe(true);
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("Valid Form data without description", () => {
    const formData = {
      title: "Title",
      description: "",
      hours: 2,
      minutes: 20,
      seconds: 18,
    };
    expect(validateTimerForm(formData)).toBe(true);
    expect(toast.error).not.toHaveBeenCalled();
  });
});
