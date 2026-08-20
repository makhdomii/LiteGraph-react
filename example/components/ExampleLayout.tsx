import React from 'react';
import { toolbarStyle } from '../chrome';

type ExampleLayoutProps = {
  toolbar?: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Full-bleed canvas area with optional docked toolbar above the canvas.
 */
export const ExampleLayout: React.FC<ExampleLayoutProps> = ({ toolbar, children }) => {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {toolbar ? (
        <div style={toolbarStyle} role="toolbar">
          {toolbar}
        </div>
      ) : null}
      <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>{children}</div>
    </div>
  );
};
