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

const fadeInUpAnimation = {
  animation: 'fadeInUp 0.5s ease-out forwards',
  opacity: 0,
};

const InitialPage = () => {

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
        overflow: 'hidden',
      }}
    >
      <Box sx={{ maxWidth: 'lg' }}>
        {!isAlertDismissed && (
          <Alert
            variant="soft"
            color="warning"
            sx={{ mb: 4, borderRadius: 'lg', padding: '1px'}}
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
              Note: ChatGPT won't work as we don't have valid API Key. Will update the code once a valid OpenAI key is available. 
              <strong> Use Gemini for now.</strong>
            </Typography>
          </Alert>
        )}

        <Typography
          level="h1"
          sx={{
            mb: 1.5,
            fontSize: { xs: '2.5rem', md: '3.75rem' },
            fontWeight: 'xl',
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
          textColor="text.tertiary"
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
            maxWidth: 'xl',
          }}
        >
          {features.map((feature, index) => (
            <Chip
              key={feature}
              variant="soft"
              color="primary"
              size="lg"
              sx={{
                ...fadeInUpAnimation,
                animationDelay: `${index * 100}ms`,
                '--Chip-radius': '999px',
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