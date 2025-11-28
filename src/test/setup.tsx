import "@testing-library/jest-dom";
import React from "react";
import { vi } from "vitest";

vi.mock("next/link", () => ({
  __esModule: true,
  default: React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
    function Link(props, ref) {
      return <a ref={ref} {...props} />;
    }
  ),
}));

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));
