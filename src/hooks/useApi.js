import { useImperativeHandle } from 'react';

import { usePanZoom } from 'context';
import getElements from 'api/elements';
import move from 'api/move';
import { getPosition, setPosition } from 'api/position';
import reset from 'api/reset';
import {
  getZoom, setZoom, zoomIn, zoomOut,
} from 'api/zoom';
import useEventsCallback from './useEventsCallback';

const useApi = () => {
  const {
    apiRef,
    childRef,
    elementsRef,
    positionRef,
    zoomRef,
  } = usePanZoom();

  const { withEventAll, withEventPosition, withEventZoom } = useEventsCallback();

  if (!apiRef) return;

  const apiExternal = apiRef;
  useImperativeHandle(apiExternal, () => ({
    move: withEventPosition(move({
      childRef, positionRef, zoomRef,
    })),
    getElements: getElements({ elementsRef }),
    getPosition: getPosition({ positionRef }),
    setPosition: withEventPosition(setPosition({
      childRef, positionRef, zoomRef,
    })),
    getZoom: getZoom({ zoomRef }),
    setZoom: withEventZoom(setZoom({
      childRef, positionRef, zoomRef,
    })),
    zoomIn: withEventZoom(zoomIn({
      childRef, positionRef, zoomRef,
    })),
    zoomOut: withEventZoom(zoomOut({
      childRef, positionRef, zoomRef,
    })),
    ref: () => childRef,
    reset: withEventAll(reset({
      childRef, positionRef, zoomRef,
    })),
  }));
};

export default useApi;
