import Box from "@mui/material/Box";
import useMeasure from "react-use-measure";

const WidthProvider = ({ children, debounce = 0 }) => {
  const [ref, bounds] = useMeasure({ debounce });
  return (
    <Box ref={ref}>
      {bounds.width ? children(Math.floor(bounds.width)) : null}
    </Box>
  );
};

export default WidthProvider;
