import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';

/**
 * A refined toggle button, renamed to SaveChat to match its usage.
 * It uses Joy UI's Switch for a modern, consistent look.
 */
export default function SaveChat({ isOn, setIsOn }) {
  
  const handleToggle = (event) => {
    setIsOn(event.target.checked);
  };

  // Allows the user to click the "Save Chat" text to toggle the switch
  const handleLabelClick = () => {
    setIsOn(!isOn);
  };

  return (
    // Use a Sheet for easy styling that matches your other controls
    <Sheet
      variant="soft" // "soft" variant looks great with other inputs
      color="neutral"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        borderRadius: 'lg', // Matches the border-radius of your Select/Textarea
        px: 1.5, // Horizontal padding
        py: 0.75, // Vertical padding
      }}
    >
      <Typography 
        level="body-sm" 
        onClick={handleLabelClick} // Make the label clickable
        sx={{ 
          color: 'text.primary',
          cursor: 'pointer',
          userSelect: 'none', // Prevents selecting text on click
        }}
      >
        Save Chat
      </Typography>
      <Switch
        checked={isOn}
        onChange={handleToggle}
        size="md"
        sx={{
          // Customizing the switch to be green when 'on'
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