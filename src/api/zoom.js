import transform from 'helpers/produceStyle';
import zoomRound from 'helpers/zoomRound';

export const getZoom = ({ zoomRef }) => () => zoomRef.current;

export const setZoom = ({ childRef, positionRef, zoomRef }) => (value) => {
  const ref = childRef;
  const zoom = zoomRef;
  zoom.current = zoomRound(value);
  ref.current.style.transform = transform({ position: positionRef.current, zoom: zoomRef.current });
};

export const zoomIn = ({ childRef, positionRef, zoomRef }) => (value) => {
  setZoom({ childRef, positionRef, zoomRef })(getZoom({ zoomRef })() + value);
};

export const zoomOut = ({ childRef, positionRef, zoomRef }) => (value) => {
  setZoom({ childRef, positionRef, zoomRef })(getZoom({ zoomRef })() - value);
};
