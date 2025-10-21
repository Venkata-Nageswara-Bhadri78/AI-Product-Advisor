import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Chip from '@mui/joy/Chip';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';

import { AiOutlineCloseCircle } from "react-icons/ai";

// An array of the feature strings.
const features = [
  "Ask in Plain English",
  "Smart AI Matching",
  "Discover Tailored Products",
  "Understand the Why",
  "Get Personalized Results",
  "No Keywords, Just Conversation",
  "From Needs → To Products",
  "Your Personal AI Shopping Guide",
  "Explain. Match. Recommend.",
  "Smarter Search, Better Choices",
];

// This assumes 'fadeInUp' is defined in your global CSS/Tailwind config.
const fadeInUpAnimation = {
  animation: 'fadeInUp 0.5s ease-out forwards',
  opacity: 0,
};

const InitialPage = () => {
  // Renamed state for clarity
  const [isAlertDismissed, setIsAlertDismissed] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        bgcolor: 'background.body',
        p: { xs: 2, md: 4 },
        overflow: 'hidden', // Prevents animation overflow
      }}
    >
      <Box sx={{ maxWidth: 'lg' }}>
        {/* This Alert replaces the 'news-ticker'. 
          It's in the page flow (not 'fixed'), looks cleaner,
          and is more accessible.
        */}
        {!isAlertDismissed && (
          <Alert
            variant="soft"
            color="warning"
            sx={{ mb: 4, borderRadius: 'lg' }}
            endDecorator={
              <IconButton 
                variant="plain" 
                color="warning" 
                size="sm"
                onClick={() => setIsAlertDismissed(true)}
              >
                <AiOutlineCloseCircle size={20} />
              </IconButton>
            }
          >
            <Typography level="body-sm" color="warning">
              Note: ChatGPT responses may be inaccurate as testing wasn't fully completed. 
              Results will update once a valid OpenAI key is available. 
              <strong> Use Gemini for accurate results.</strong>
            </Typography>
          </Alert>
        )}

        <Typography
          level="h1"
          sx={{
            mb: 1.5,
            fontSize: { xs: '2.5rem', md: '3.75rem' }, // Responsive font size
            fontWeight: 'xl',
            // Gradient text effect using Joy UI's sx prop
            background: (theme) =>
              `linear-gradient(to right, ${theme.vars.palette.primary[400]}, ${theme.vars.palette.success[400]})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Welcome to AI Product Advisor
        </Typography>

        <Typography
          level="body-lg"
          textColor="text.tertiary" // Use theme color for accessibility
          sx={{ mb: 6 }}
        >
          Your personal guide to smarter choices.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1.5,
            justifyContent: 'center',
            maxWidth: 'xl', // was max-w-4xl
          }}
        >
          {features.map((feature, index) => (
            <Chip
              key={feature}
              variant="soft" // 'soft' gives a nice, modern bg
              color="primary"
              size="lg" // Larger, more readable chips
              sx={{
                ...fadeInUpAnimation,
                animationDelay: `${index * 100}ms`,
                '--Chip-radius': '999px', // Makes it a pill
              }}
            >
              {feature}
            </Chip>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default InitialPage;