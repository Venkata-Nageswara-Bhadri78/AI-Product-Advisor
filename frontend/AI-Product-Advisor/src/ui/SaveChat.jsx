import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';

export default function SaveChat({ isOn, setIsOn }) {
  
  const handleToggle = (event) => {
    setIsOn(event.target.checked);
  };
  const handleLabelClick = () => {
    setIsOn(!isOn);
  };

  return (
    <Sheet
      variant="soft"
      color="neutral"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        borderRadius: 'lg',
        px: 1.5,
        py: 0.75,
      }}
    >
      <Typography 
        level="body-sm" 
        onClick={handleLabelClick}
        sx={{ 
          color: 'text.primary',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        Save Chat
      </Typography>
      <Switch
        checked={isOn}
        onChange={handleToggle}
        size="md"
        sx={{
          '&.Mui-checked': {
            '--Switch-trackBackground': (theme) => theme.vars.palette.success[400],
            '&:hover': {
              '--Switch-trackBackground': (theme) => theme.vars.palette.success[500],
            }
          },
        }}
      />
    </Sheet>
  );
}