import * as React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { BsRobot } from "react-icons/bs";
import { MdPerson } from "react-icons/md";

// --- Smaller sizing constants ---
const SWITCH_WIDTH = 48;
const SWITCH_HEIGHT = 24;
const THUMB_SIZE = 20;
const ICON_IN_THUMB_SIZE = 12;
const LABEL_ICON_SIZE = 18;

const ThumbIconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: THUMB_SIZE,
  height: THUMB_SIZE,
  borderRadius: '50%',
  backgroundColor: '#FFFFFF',
  boxShadow: '0 1px 4px 0 rgba(0,0,0,0.15)',
}));

const AIToggleSwitch = styled(Switch)(({ theme }) => ({
  width: SWITCH_WIDTH,
  height: SWITCH_HEIGHT,
  padding: 0,
  '& .MuiSwitch-track': {
    borderRadius: SWITCH_HEIGHT / 2,
    backgroundColor: theme.palette.success.main,
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 300,
    }),
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    transition: theme.transitions.create(['transform'], {
      duration: 300,
      easing: theme.transitions.easing.easeInOut,
    }),
    '&.Mui-checked': {
      transform: `translateX(${SWITCH_WIDTH - THUMB_SIZE - 2 * 2}px)`, // adjusted for smaller padding
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '4px solid #fff',
    },
  },
}));

const SwitchLabel = ({ icon, text, color }) => (
  <Stack direction="row" spacing={1} alignItems="center" sx={{ color, transition: 'color 0.3s ease' }}>
    {icon}
    <Typography variant="body2" sx={{ fontWeight: 500 }}>
      {text}
    </Typography>
  </Stack>
);

export default function RefinedAIToggleSwitch({isAI, setIsAI}) {

  const handleChange = (event) => {
    setIsAI(event.target.checked);
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <SwitchLabel
        text="Man"
        color={!isAI ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-text-secondary)'}
        icon={<MdPerson size={LABEL_ICON_SIZE} />}
      />
      
      <AIToggleSwitch
        checked={isAI}
        onChange={handleChange}
        aria-label="Toggle between AI and Human agent"
        icon={
          <ThumbIconWrapper>
            <MdPerson size={ICON_IN_THUMB_SIZE} color="var(--mui-palette-success-main)" />
          </ThumbIconWrapper>
        }
        checkedIcon={
          <ThumbIconWrapper>
            <BsRobot size={ICON_IN_THUMB_SIZE} color="var(--mui-palette-primary-main)" />
          </ThumbIconWrapper>
        }
      />
      
      <SwitchLabel
        text="AI"
        color={isAI ? 'var(--mui-palette-primary-main)' : 'var(--mui-palette-text-secondary)'}
        icon={<BsRobot size={LABEL_ICON_SIZE} />}
      />
    </Stack>
  );
}
