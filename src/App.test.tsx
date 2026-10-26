import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("./components/RevenueChart", () => ({
  default: () => <div data-testid="revenue-chart">Revenue chart ready</div>,
}));

describe("Aurelia Revenue Intelligence", () => {
  it("renders the revenue workspace and chart region", async () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /Revenue, in focus/i })).toBeInTheDocument();
    expect(await screen.findByTestId("revenue-chart")).toBeInTheDocument();
  });
});
