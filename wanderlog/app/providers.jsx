// 'use client'

// import {NextUIProvider} from '@nextui-org/react'

// export function Providers({children}: { children: React.ReactNode }) {
//   return (
//     <NextUIProvider>
//       {children}
//     </NextUIProvider>
//   )
// }

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