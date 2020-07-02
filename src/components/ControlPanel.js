import React from 'react';
import { ColorControls } from './ColorControls';
import { ScaleControls } from './ScaleControls';
import { TransformControls } from './TransformControls';

export function ControlPanel() {

  return ( 
    <div className='container' style={{ padding: '0 50px' }}>
      <ColorControls />
      <ScaleControls />
      <TransformControls />
    </div>
   );
}
