import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import useApi from './hooks/useApi';
import useMove from './hooks/useMove';
import useZoom from './hooks/useZoom';
import Select from './Select';
import { PARENT_STYLE, CHILD_STYLE, CHILD_DISABLED_STYLE } from './styles';
import PanZoomProvider, { usePanZoom } from './context';

const CLASS_NAME = 'react-panzoom';

const PanZoom = ({
  children, className, disabled, disabledUserSelect, height, width, selecting,
}) => {
  const { childRef, setLoading } = usePanZoom();

  useMove();
  useZoom();
  useApi();

  const classNameMemo = useMemo(() => {
    const classes = [CLASS_NAME];
    if (className) classes.push(className);
    if (disabled) classes.push(`${CLASS_NAME}--disabled`);
    if (disabledUserSelect) classes.push(`${CLASS_NAME}--disabled-user-select`);
    return classes.join(' ');
  }, [className, disabled, disabledUserSelect]);

  const classNameChildMemo = useMemo(() => {
    const classes = [`${CLASS_NAME}__in`];
    if (className) classes.push(`${className}__in`);
    if (selecting) classes.push(`${className}__selecting`);
    return classes.join(' ');
  }, [className, selecting]);

  const childStyle = useMemo(() => {
    let style = {
      ...CHILD_STYLE,
      height,
      width,
    };

    if (className) style.backgroundColor = null;
    if (disabledUserSelect) style = { ...style, ...CHILD_DISABLED_STYLE };
    if (selecting) style.pointerEvents = 'all';

    return style;
  }, [className, disabledUserSelect, height, width, selecting]);

  const createRef = (node) => {
    childRef.current = node;
    setLoading(false);
  };

  return (
    <div className={classNameMemo} style={PARENT_STYLE}>
      <div draggable={false} className={classNameChildMemo} ref={createRef} style={childStyle}>
        {children}
        {selecting && <Select />}
      </div>
    </div>
  );
};

PanZoom.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  disabledUserSelect: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  selecting: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

PanZoom.defaultProps = {
  className: null,
  disabled: false,
  disabledUserSelect: false,
  height: '100%',
  selecting: false,
  width: '100%',
};

const PanZoomWithContext = (props, apiRef) => (
  <PanZoomProvider apiRef={apiRef} {...props}>
    <PanZoom {...props} />
  </PanZoomProvider>
);

export default forwardRef(PanZoomWithContext);
