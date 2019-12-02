import { useEffect } from 'react';
import throttle from 'lodash/throttle';

import transform from '../helpers/produceStyle';
import produceBounding from '../helpers/produceBounding';
import { usePanZoom } from '../context';

const ZOOM_SPEED_BASE = 25; // ms

const useZoom = (ref, loading) => {
  const panZoomRef = ref.current;
  const {
    boundary,
    disabled,
    disabledZoom,
    positionRef,
    onChange,
    onZoomChange,
    zoomMax,
    zoomMin,
    zoomRef,
    zoomSpeed,
    zoomStep,
  } = usePanZoom();

  const dependencies = [
    boundary,
    disabled,
    disabledZoom,
    loading,
    onChange,
    onZoomChange,
    ref,
    zoomSpeed,
    zoomStep,
  ];

  useEffect(() => {
    if (loading || disabled || disabledZoom) return undefined;

    const wheel = throttle((e) => {
      const rect = panZoomRef.parentNode.getBoundingClientRect();

      const xoff = (e.clientX - rect.left - positionRef.current.x) / zoomRef.current;
      const yoff = (e.clientY - rect.top - positionRef.current.y) / zoomRef.current;

      const nextZoom = (() => {
        if (e.deltaY < 0) {
          if (zoomMax && zoomRef.current >= zoomMax) return zoomMax;
          return zoomRef.current + zoomStep;
        }
        if (zoomMin && zoomRef.current <= zoomMin) return zoomMin;
        return zoomRef.current - zoomStep;
      })();
      zoomRef.current = nextZoom;

      const nextPosition = produceBounding({
        boundary,
        x: e.clientX - rect.left - xoff * nextZoom,
        y: e.clientY - rect.top - yoff * nextZoom,
        zoom: nextZoom,
      });

      positionRef.current = nextPosition;
      panZoomRef.style.transform = transform({ position: positionRef.current, zoom: nextZoom });

      if (onChange) onChange({ position: { ...positionRef.current }, zoom: nextZoom });
      if (onZoomChange) onZoomChange({ zoom: nextZoom, position: { ...positionRef.current } });
    }, ZOOM_SPEED_BASE / zoomSpeed);

    if (!panZoomRef) return wheel.cancel;

    const onWheel = (e) => {
      e.preventDefault();
      wheel(e);
    };

    panZoomRef.parentNode.addEventListener('wheel', onWheel);

    return () => {
      wheel.cancel();
      panZoomRef.parentNode.removeEventListener('wheel', onWheel);
    };
  }, dependencies);

  return zoomRef;
};

export default useZoom;
