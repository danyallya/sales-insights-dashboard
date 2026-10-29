import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("./components/RevenueChart", () => ({
  default: () => <div data-testid="revenue-chart">Revenue chart ready</div>,
}));

afterEach(() => cleanup());

describe("Aurelia Revenue Intelligence", () => {
  it("renders the revenue workspace and chart region", async () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /Revenue, in focus/i })).toBeInTheDocument();
    expect(await screen.findByTestId("revenue-chart")).toBeInTheDocument();
    expect(screen.getByText("$742,000")).toBeInTheDocument();
    expect(screen.getByText("68.4%")).toBeInTheDocument();
    expect(screen.getByText("10,024")).toBeInTheDocument();
    expect(screen.getByText("$74.02")).toBeInTheDocument();
    expect(screen.getByText(/illustrative sample data/i)).toBeInTheDocument();
    expect(screen.queryByText(/synced from Shopify/i)).not.toBeInTheDocument();
  });

  it("applies a selected quarter to revenue metrics and announces the active range", () => {
    render(<App />);

    fireEvent.change(screen.getByRole("combobox", { name: "Reporting period" }), {
      target: { value: "q1" },
    });

    expect(screen.getByText("$122,000")).toBeInTheDocument();
    expect(screen.getByText("2,160")).toBeInTheDocument();
    expect(screen.getByText("$56.48")).toBeInTheDocument();
    expect(screen.getByText("Revenue KPIs and trend show Q1 · Jan–Mar. Account examples remain full-year samples."))
      .toHaveAttribute("role", "status");
    expect(screen.getByText("Full-year account examples; not filtered by reporting period.")).toBeInTheDocument();
  });
});
