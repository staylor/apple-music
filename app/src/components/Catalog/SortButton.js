import React from 'react';

/* eslint-disable react/prop-types */

const SortButton = ({ sort, relay, children }) => (
  <button onClick={() => relay.setVariables({ sort })}>{children}</button>
);

export default SortButton;
