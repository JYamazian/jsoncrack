import React from "react";
import { Anchor, Box, Container, Text } from "@mantine/core";

interface FooterProps {
  isDarkMode?: boolean;
}

export const Footer = ({ isDarkMode = false }: FooterProps) => {
  return (
    <Box
      component="footer"
      py="md"
      style={{
        borderTop: `1px solid ${isDarkMode ? "#2a2a3e" : "#e9ecef"}`,
        background: isDarkMode ? "#0a0a0a" : "#f8f9fa",
      }}
    >
      <Container size="lg">
        <Text ta="center" size="xs" c="dimmed">
          © 2025{" "}
          <Anchor
            href="https://github.com/JYamazian/jsoncrack"
            target="_blank"
            rel="noopener noreferrer"
            c="dimmed"
            underline="hover"
            style={{
              transition: "color 0.2s ease",
            }}
            styles={{
              root: {
                "&:hover": {
                  color: "#7c3aed",
                },
              },
            }}
          >
            JSON Crack
          </Anchor>{" "}
          • Open-source derivative
        </Text>
      </Container>
    </Box>
  );
};
