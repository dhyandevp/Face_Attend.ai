import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import Privacy from "@/app/privacy/page";
import Terms from "@/app/terms/page";
import { developerEmail } from "@/lib/product";

describe("App routes and interactions", () => {
  it("renders the Home page hero and heading", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1, name: /FaceAttend/i })).toBeInTheDocument();
    expect(screen.getByText(/Attendance automation/i)).toBeInTheDocument();
  });

  it("cycles workflow stages in the orbital showcase", () => {
    render(<Home />);
    expect(screen.getByText(/Stage 1 of 6/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Next workflow stage/i }));
    expect(screen.getByText(/Stage 2 of 6/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /Turn captured frames into local recognition/i }),
    ).toBeInTheDocument();
  });

  it("renders the direct contact section with developer email and portfolio links", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 2, name: /Your campus\.\s*Your next chapter\./i }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: new RegExp(developerEmail, "i") }).length,
    ).toBeGreaterThan(0);
  });

  it("opens the workflow stage inspector dialog on Learn more", () => {
    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: /Learn more/i }));
    expect(screen.getByText(/Pipeline implementation/i)).toBeInTheDocument();
  });

  it("switches technology stack and code tabs interactively", () => {
    render(<Home />);
    fireEvent.click(screen.getByRole("tab", { name: /Sample CSV Output/i }));
    expect(screen.getByText(/Attendance_2026-11-26\.csv/i)).toBeInTheDocument();
  });

  it("toggles FAQ expand all / collapse all", () => {
    render(<Home />);
    const toggleBtn = screen.getByRole("button", { name: /Expand all/i });
    fireEvent.click(toggleBtn);
    expect(screen.getByRole("button", { name: /Collapse all/i })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("renders the Privacy policy page", () => {
    render(<Privacy />);
    expect(screen.getByRole("heading", { level: 1, name: /Privacy/i })).toBeInTheDocument();
  });

  it("renders the Terms page", () => {
    render(<Terms />);
    expect(screen.getByRole("heading", { level: 1, name: /Terms/i })).toBeInTheDocument();
  });
});
