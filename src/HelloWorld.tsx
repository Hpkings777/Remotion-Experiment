import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate, Sequence } from 'remotion';
import React from 'react';

const neonEffect = {
  textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #00aaff, 0 0 20px #00aaff, 0 0 25px #00aaff, 0 0 30px #00aaff, 0 0 35px #00aaff',
};

export const HelloWorld: React.FC = () => {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();
  const countdownItems = [5, 4, 3, 2, 1, 'GO!'];

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
      {countdownItems.map((item, index) => {
        const itemStartFrame = index * (videoConfig.fps);
        const itemEndFrame = itemStartFrame + videoConfig.fps;
        
        const opacity = interpolate(
          frame,
          [itemStartFrame, itemStartFrame + videoConfig.fps / 4, itemEndFrame - videoConfig.fps / 4, itemEndFrame],
          [0, 1, 1, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        const scale = interpolate(
          frame,
          [itemStartFrame, itemStartFrame + videoConfig.fps / 4, itemEndFrame],
          [0.5, 1.2, 0.8],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <Sequence key={index} from={itemStartFrame} durationInFrames={videoConfig.fps}>
            <div style={{ 
              ...neonEffect, 
              fontSize: '180px', 
              fontFamily: 'monospace', 
              fontWeight: 'bold', 
              color: '#00aaff', 
              opacity, 
              transform: `scale(${scale})`,
              position: 'absolute' 
            }}>
              {item}
            </div>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
