import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    "@global": {
      ".recharts-text": {
        color: theme.palette.text.secondary,
        fill: theme.palette.text.secondary,
      },
      ".recharts-default-tooltip": {
        backgroundColor: `${theme.palette.background.paper} !important`,
        border: `1px solid ${theme.palette.divider} !important`,
        boxShadow: theme.shadows[2],
      },
      ".recharts-cartesian-axis-line, .recharts-cartesian-axis-tick-line": {
        stroke: theme.palette.divider,
      },
      ".react-grid-item > .react-resizable-handle::after": {
        borderRightColor: theme.palette.action.active,
        borderBottomColor: theme.palette.action.active,
      },
      ".react-grid-item.react-grid-placeholder": {
        backgroundColor: theme.palette.secondary.main,
      },
      ".react-grid-item:hover": {
        zIndex: theme.zIndex.appBar - 1,
      },
    },
  })
);

export default useStyles;
