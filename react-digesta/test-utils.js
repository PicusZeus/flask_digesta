import React from "react";
import { render } from "@testing-library/react";
import App from "./src/App";

const customRender = (ui, options) => render(ui, { wrapper: App, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
