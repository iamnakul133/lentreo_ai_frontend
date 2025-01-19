import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const SpinElement = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  .tip {
    color: inherit;
    margin-top: 5px;
    text-shadow: 0 1px 2px #fff;
    font-weight: 500;
  }

  svg {
    fill: ${(props) => props.color};
    height: ${(props) => props.size}px;
  }
`;

const NestedContainer = styled('div')`
  position: relative;
  .spinning {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
  }
`;

const ChildContainer = styled('div')`
  opacity: 0.4;
  position: relative;
  &:after {
    content: '';
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.5;
  }
`;

class Spin extends React.PureComponent {
  hasChildren = () => {
    return !!(this.props && this.props.children);
  };

  render() {
    const {
      spinning,
      tip,
      size = 16,
      color,
      className,
      style,
      children,
      linear,
      withLabel,
      isDeterminate,
      progress,
    } = this.props;

    const hasChildren = this.hasChildren();

    const spinElement = (
      <SpinElement
        className={cx(className, { spinning })}
        size={size}
        color={color}
      >
        {linear ? (
          <LinearProgress
            sx={{ width: '100%' }}
            variant="indeterminate"
            color="primary"
          />
        ) : !withLabel ? (
          <CircularProgress color="primary" size={size} />
        ) : (
          <Box display="inline-flex" position="relative">
            <CircularProgress
              variant={isDeterminate ? 'determinate' : 'indeterminate'}
              color="primary"
              value={progress}
              size={size}
            />
            <Box
              display="flex"
              position="absolute"
              alignItems="center"
              justifyContent="center"
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {`${progress}%`}
              </Typography>
            </Box>
          </Box>
        )}
        {tip ? <div className="tip">{tip}</div> : null}
      </SpinElement>
    );

    if (hasChildren) {
      if (!spinning) return children;
      return (
        <NestedContainer className={className} style={style}>
          {spinElement}
          <ChildContainer>{children}</ChildContainer>
        </NestedContainer>
      );
    } else if (spinning) {
      return spinElement;
    }
    return null;
  }
}

Spin.defaultProps = {
  size: 16,
  spinning: false,
};

Spin.propTypes = {
  spinning: PropTypes.bool,
  tip: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  linear: PropTypes.bool,
};

export default Spin;
