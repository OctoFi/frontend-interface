import React from "react";
import { MemoryRouter } from "react-router";
// import Providers from "../src/Providers";
import "bootstrap/dist/css/bootstrap.min.css";

// import "../src/global.scss";

export const decorators = [
  (Story) => (
    <MemoryRouter initialEntries={["/"]}>
      {/* <Providers> */}
      <Story />
      {/* </Providers> */}
    </MemoryRouter>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
