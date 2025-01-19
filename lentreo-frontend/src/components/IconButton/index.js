import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import usePromise from "../../hooks/usePromise";

const LoadingIconButton = ({
  icon,
  to,
  href,
  title,
  loading,
  onClick,
  ...rest
}) => {
  const [isLoading, handler] = usePromise(onClick, loading);

  let children = (
    <IconButton onClick={handler} {...rest}>
      {isLoading ? <CircularProgress size={12} /> : icon}
    </IconButton>
  );

  if (title) {
    children = (
      <Tooltip arrow title={title} enterDelay={500}>
        {children}
      </Tooltip>
    );
  }

  if (to) {
    return (
      <MuiLink component={Link} to={to} {...rest}>
        {children}
      </MuiLink>
    );
  }
  if (href) {
    return (
      <MuiLink href={href} {...rest}>
        {children}
      </MuiLink>
    );
  }
  return children;
};

export default LoadingIconButton;
