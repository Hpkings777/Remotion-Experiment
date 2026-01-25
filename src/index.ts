import { registerRoot, Composition } from 'remotion';
import React from 'react';
import * as Comp from './Component';

const RemotionRoot: React.FC = () => {
  // Direct Access: No filtering, no guessing.
  const Target = Comp.HelloWorld;

  if (!Target || typeof Target !== 'function') {
    throw new Error("❌ Phorix Error: 'HelloWorld' component missing in payload! Check your export name.");
  }

  return (
    <Composition
      id="PhorixVideo"
      component={Target as any}
      durationInFrames={180}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

registerRoot(RemotionRoot);
export default RemotionRoot;
