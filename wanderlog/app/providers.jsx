

'use client';
import React from 'react';

const NextUIProvider = require('@nextui-org/react').NextUIProvider;

function Providers({ children }) {
  return (
    React.createElement(NextUIProvider, null, children)
  );
}

module.exports = {
  Providers
};