import React from 'react';
import { Box, Button, Center, Text } from '@chakra-ui/react';
import ParticlesBg from 'particles-bg';
import { Link } from 'react-router-dom';
const HomePage = () => {
  return (
    <Box position="relative" w="100%" h="100%" >
      {/* Particle Background */}
      <ParticlesBg type="cobweb" bg={true} />

      {/* Main Content */}
      <Center height="100%" flexDirection="column" zIndex="2" position="relative">
        {/* Title */}
        <Text fontSize="4xl" fontWeight="bold" mb="4" color="black">
          Textex: a messaging web app
        </Text>

        {/* Go to Login Page Button */}
        <Link to="/login">
          <Button borderColor="black" size="lg" color={"black"} >
            Go to Login Page
          </Button>
        </Link>
      </Center>
    </Box>
  );
};

export default HomePage;
