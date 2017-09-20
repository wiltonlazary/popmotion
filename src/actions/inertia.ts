// Implementation of https://ariya.io/2013/11/javascript-kinetic-scrolling-part-2
import { timeSinceLastFrame } from 'framesync';
import action from './action';
import clock from './clock';

type InertiaProps = {
  velocity?: number,
  from?: number,
  modifyTarget?: (v: number) => number,
  power?: number,
  timeConstant?: number,
  autoStopDelta?: number
};

const inertia = ({
  velocity = 0,
  from = 0,
  power = 0.8,
  timeConstant = 350,
  autoStopDelta = 0.5,
  modifyTarget
}: InertiaProps = {}) => action(({ complete, update }) => {
  let elapsed = 0;
  const amplitude = power * velocity;
  const idealTarget = Math.round(from + amplitude);
  const target = (typeof modifyTarget === 'undefined')
    ? idealTarget
    : modifyTarget(idealTarget);

  const timer = clock.start(() => {
    elapsed += timeSinceLastFrame();
    const delta = -amplitude * Math.exp(-elapsed / timeConstant);
    const isMoving = (delta > autoStopDelta || delta < -autoStopDelta);
    const current = isMoving ? target + delta : target;

    update(current);

    if (!isMoving) complete();
  });

  return {
    stop: () => timer.stop()
  };
});

export default inertia;