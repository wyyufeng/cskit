import * as React from "react";

const defaultValue: { service: any } = {
  service: () => Promise.resolve()
};
const CSPreset = React.createContext(defaultValue);
export default CSPreset;
