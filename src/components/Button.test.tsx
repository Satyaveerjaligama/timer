import { describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import Button from "./Button";
import "@testing-library/jest-dom";

// Testsuite that contains testcases related to Button component
describe("Button Component", () => {
  it("Button with Default props", () => {
    const { getByText } = render(<Button buttonLabel="Default Button" />);
    const button = getByText("Default Button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("filled-button");
    expect(button).toHaveAttribute("type", "button");
  });

  it("Disabled Button", () => {
    const { getByText } = render(
      <Button buttonLabel="Disabled Button" disabled={true} />
    );
    const button = getByText("Disabled Button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("disabled-button");
    expect(button).toBeDisabled();
  });

  it("Outlined Button", () => {
    const { getByText } = render(
      <Button buttonLabel="Outlined Button" variant="outlined" />
    );
    const button = getByText("Outlined Button");
    expect(button).toHaveClass("outlined-button");
    expect(button).toHaveAttribute("type", "button");
  });

  it("Button with type=submit", () => {
    const { getByText } = render(
      <Button buttonLabel="Submit Button" type="submit" />
    );
    const button = getByText("Submit Button");
    expect(button).toHaveAttribute("type", "submit");
  });

  it("Button with class name", () => {
    const { getByText } = render(
      <Button buttonLabel="Test Button" className="button-class" />
    );
    const button = getByText("Test Button");
    expect(button).toHaveClass("button-class");
  });

  it("Click Functionality", () => {
    const onClickFunctionMock = vi.fn();
    const { getByText } = render(
      <Button buttonLabel="Button" onClick={onClickFunctionMock} />
    );
    const button = getByText("Button");
    fireEvent.click(button);
    expect(onClickFunctionMock).toHaveBeenCalledTimes(1);
  });

  it("Click functionality when button is disabled", () => {
    const onClickFunctionMock = vi.fn();
    const { getByText } = render(
      <Button buttonLabel="Button" onClick={onClickFunctionMock} disabled />
    );
    const button = getByText("Button");
    fireEvent.click(button);
    expect(onClickFunctionMock).toHaveBeenCalledTimes(0);
  });
});
