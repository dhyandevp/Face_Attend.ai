import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import Privacy from "@/app/privacy/page";
import Terms from "@/app/terms/page";

describe("App routes", () => {
  it("renders the Home page hero and heading", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1, name: /FaceAttend/i })).toBeInTheDocument();
    expect(screen.getByText(/Attendance automation/i)).toBeInTheDocument();
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
