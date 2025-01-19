import React, { useState, useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import IconButton from "../../components/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";
import WidthProvider from "../../components/WidthProvider";
import { Responsive } from 'react-grid-layout';
import PageContainer from '../../components/PageContainer';
import { styled } from '@mui/material/styles';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './styles.css';

// Import new components
import DailyHoroscope from '../../components/DashboardWidgets/DailyHoroscope'
import MonthlyHoroscope from '../../components/DashboardWidgets/MonthlyHoroscope';
import DoesDont from '../../components/DashboardWidgets/DoesDont';

const StyledGridItem = styled('div')(({ theme }) => ({
  cursor: 'move',
  userSelect: 'none',
  height: '100%',
  '& > .MuiCard-root': {
    height: '100%',
    margin: theme.spacing(1),
  }
}));

const LG = 1280;
const MD = 992;
const SM = 768;
const XS = 480;
const XXS = 0;

// Sample data for charts

const Dashboard = () => {
  const [isEditing, setEditing] = useState(false);
  const [layouts, setLayouts] = useState({
    lg: [
      { i: 'daily_horo', x: 0, y: 0, w: 4, h: 3 },
      { i: 'monthly_horo', x: 4, y: 0, w: 8, h: 3 },
      { i: 'does_dont', x: 0, y: 3, w: 12, h: 3 },
    ]
  });
  const [mounted, setMounted] = useState(false);

  // Add useEffect to handle mounting state
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const onLayoutChange = (layout, layouts) => {
    if (mounted) {
      setLayouts(layouts);
    }
  };

  const onSave = () => {
    // Save layout logic here
    setEditing(false);
  };

  const gridChildren = [
    <div key="daily_horo" className="grid-item" style={{ height: '100%' }}>
      <StyledGridItem className="grid-item-title">
        <DailyHoroscope />
      </StyledGridItem>
    </div>,
    <div key="monthly_horo" className="grid-item" style={{ height: '100%' }}>
      <StyledGridItem className="grid-item-title">
        <MonthlyHoroscope />
      </StyledGridItem>
    </div>,
    <div key="does_dont" className="grid-item" style={{ height: '100%' }}>
      <StyledGridItem className="grid-item-title">
        <DoesDont />
      </StyledGridItem>
    </div>
  ];

  return (
    <PageContainer 
      title="Home" 
      sx={{ 
        overflow: "clip",
        px: { xs: 1, sm: 2 }, // Responsive padding
        maxWidth: "100%" 
      }}
    >
      <PageContainer.PageHeader
        sx={{ 
          alignItems: "left",
          mb: 2, 
          px: 1 
        }}
        primary="Dashboard"
        primaryTypographyProps={{
          variant: "h5", // Changed to h5 for better hierarchy
          color: "text.primary",
          mb: 0,
        }}
        actions={
          <Stack key={0} direction="row" spacing={1} alignItems="center">
            {isEditing ? (
              <>
                <IconButton
                  size="small"
                  title="Cancel"
                  icon={<UndoIcon />}
                  onClick={() => setEditing(false)}
                />
                <IconButton
                  size="small"
                  title="Save"
                  icon={<SaveIcon />}
                  onClick={onSave}
                />
              </>
            ) : (
              <IconButton
                size="small"
                title="Edit Dashboard"
                icon={<EditIcon />}
                onClick={() => setEditing(true)}
              />
            )}
          </Stack>
        }
      />
      <Box sx={{ mt: 1 }}> {/* Reduced top margin */}
        <WidthProvider debounce={30}>
          {(width) => (
            <Responsive
              className="layout"
              width={width}
              isDraggable={isEditing}
              isRearrangeable={isEditing}
              isResizable={isEditing}
              draggableHandle=".grid-item-title"
              breakpoints={{ lg: LG, md: MD, sm: SM, xs: XS, xxs: XXS }}
              cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
              layouts={layouts}
              useCSSTransforms={mounted}
              onLayoutChange={onLayoutChange}
              onResizeStop={onLayoutChange}
              measureBeforeMount={false}
              margin={[12, 12]} // Reduced grid margins
            >
              {gridChildren}
            </Responsive>
          )}
        </WidthProvider>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;