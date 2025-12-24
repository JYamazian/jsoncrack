import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Group,
  Badge,
  Stack,
  Button,
  Box,
  ThemeIcon,
} from "@mantine/core";
import { NextSeo } from "next-seo";
import { TbArrowRight, TbCode, TbSchema, TbTransform } from "react-icons/tb";
import { SEO } from "../constants/seo";
import { Footer } from "../layout/Footer";
import Layout from "../layout/PageLayout";
import useConfig from "../store/useConfig";

const converters = [
  { from: "JSON", to: "YAML", href: "/converter/json-to-yaml" },
  { from: "JSON", to: "XML", href: "/converter/json-to-xml" },
  { from: "JSON", to: "CSV", href: "/converter/json-to-csv" },
  { from: "YAML", to: "JSON", href: "/converter/yaml-to-json" },
  { from: "YAML", to: "XML", href: "/converter/yaml-to-xml" },
  { from: "YAML", to: "CSV", href: "/converter/yaml-to-csv" },
  { from: "XML", to: "JSON", href: "/converter/xml-to-json" },
  { from: "XML", to: "YAML", href: "/converter/xml-to-yaml" },
  { from: "XML", to: "CSV", href: "/converter/xml-to-csv" },
  { from: "CSV", to: "JSON", href: "/converter/csv-to-json" },
  { from: "CSV", to: "YAML", href: "/converter/csv-to-yaml" },
  { from: "CSV", to: "XML", href: "/converter/csv-to-xml" },
];

const typeGenerators = [
  { from: "JSON", to: "TypeScript", href: "/type/json-to-typescript" },
  { from: "JSON", to: "Go", href: "/type/json-to-go" },
  { from: "JSON", to: "Rust", href: "/type/json-to-rust" },
  { from: "JSON", to: "Kotlin", href: "/type/json-to-kotlin" },
  { from: "YAML", to: "TypeScript", href: "/type/yaml-to-typescript" },
  { from: "YAML", to: "Go", href: "/type/yaml-to-go" },
  { from: "YAML", to: "Rust", href: "/type/yaml-to-rust" },
  { from: "YAML", to: "Kotlin", href: "/type/yaml-to-kotlin" },
  { from: "XML", to: "TypeScript", href: "/type/xml-to-typescript" },
  { from: "XML", to: "Go", href: "/type/xml-to-go" },
  { from: "XML", to: "Rust", href: "/type/xml-to-rust" },
  { from: "XML", to: "Kotlin", href: "/type/xml-to-kotlin" },
  { from: "CSV", to: "TypeScript", href: "/type/csv-to-typescript" },
  { from: "CSV", to: "Go", href: "/type/csv-to-go" },
  { from: "CSV", to: "Rust", href: "/type/csv-to-rust" },
  { from: "CSV", to: "Kotlin", href: "/type/csv-to-kotlin" },
];

const formatColors: Record<string, string> = {
  JSON: "violet",
  YAML: "blue",
  XML: "teal",
  CSV: "orange",
  TypeScript: "blue",
  Go: "cyan",
  Rust: "orange",
  Kotlin: "grape",
};

const HomePage = () => {
  const themeMode = useConfig(state => state.themeMode);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const getEffectiveTheme = () => {
      if (themeMode === "auto") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
      return themeMode === "dark";
    };

    setIsDarkMode(getEffectiveTheme());

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (themeMode === "auto") {
        setIsDarkMode(mediaQuery.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [themeMode]);

  return (
    <Layout>
      <NextSeo {...SEO} canonical="https://jsoncrack.com" />

      {/* Hero */}
      <Box
        style={{
          background: isDarkMode
            ? "linear-gradient(180deg, #1a1a2e 0%, #0a0a0a 100%)"
            : "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
          borderBottom: `1px solid ${isDarkMode ? "#2a2a3e" : "#e9ecef"}`,
        }}
      >
        <Container size="lg" py={80}>
          <Stack align="center" gap="lg">
            <Title
              ta="center"
              c={isDarkMode ? "white" : "dark"}
              fz={{ base: 32, sm: 48 }}
              fw={800}
              style={{ letterSpacing: "-0.02em" }}
            >
              Transform Your Data
              <Text component="span" inherit c="violet">
                {" "}
                Instantly
              </Text>
            </Title>
            <Text ta="center" c="dimmed" size="xl" maw={600} lh={1.6}>
              Visualize JSON as interactive graphs, convert between formats, and generate types for
              any language — all in your browser.
            </Text>
            <Button
              component={Link}
              href="/editor"
              size="lg"
              radius="md"
              color="violet"
              rightSection={<TbArrowRight size={18} />}
            >
              Open Editor
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container size="lg" py={60}>
        {/* Converters Section */}
        <Group gap="sm" mb="lg">
          <ThemeIcon size="lg" radius="md" variant="light" color="blue">
            <TbTransform size={20} />
          </ThemeIcon>
          <Title order={2} c={isDarkMode ? "white" : "dark"}>
            Format Converters
          </Title>
        </Group>
        <Text c="dimmed" mb="xl" maw={500}>
          Convert between JSON, YAML, XML, and CSV formats with a single click.
        </Text>
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md" mb={60}>
          {converters.map(({ from, to, href }) => (
            <Card
              key={href}
              component={Link}
              href={href}
              padding="md"
              radius="lg"
              withBorder
              style={{
                cursor: "pointer",
                transition: "all 0.2s ease",
                borderColor: isDarkMode ? "#2a2a3e" : "#e9ecef",
                background: isDarkMode ? "#1a1a2e" : "#ffffff",
              }}
              styles={{
                root: {
                  ":hover": {
                    transform: "translateY(-2px)",
                    boxShadow: isDarkMode
                      ? "0 4px 12px rgba(0,0,0,0.3)"
                      : "0 4px 12px rgba(0,0,0,0.08)",
                    borderColor: "#7c3aed",
                  },
                },
              }}
            >
              <Group gap="xs" justify="center">
                <Badge variant="filled" color={formatColors[from]} size="sm" radius="sm">
                  {from}
                </Badge>
                <TbTransform size={14} color="#868e96" />
                <Badge variant="filled" color={formatColors[to]} size="sm" radius="sm">
                  {to}
                </Badge>
              </Group>
            </Card>
          ))}
        </SimpleGrid>

        {/* Type Generators Section */}
        <Group gap="sm" mb="lg">
          <ThemeIcon size="lg" radius="md" variant="light" color="orange">
            <TbCode size={20} />
          </ThemeIcon>
          <Title order={2} c={isDarkMode ? "white" : "dark"}>
            Type Generators
          </Title>
        </Group>
        <Text c="dimmed" mb="xl" maw={500}>
          Generate strongly-typed definitions for TypeScript, Go, Rust, and Kotlin.
        </Text>
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md" mb={60}>
          {typeGenerators.map(({ from, to, href }) => (
            <Card
              key={href}
              component={Link}
              href={href}
              padding="md"
              radius="lg"
              withBorder
              style={{
                cursor: "pointer",
                transition: "all 0.2s ease",
                borderColor: isDarkMode ? "#2a2a3e" : "#e9ecef",
                background: isDarkMode ? "#1a1a2e" : "#ffffff",
              }}
              styles={{
                root: {
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: isDarkMode
                      ? "0 4px 12px rgba(0,0,0,0.3)"
                      : "0 4px 12px rgba(0,0,0,0.08)",
                    borderColor: "#7c3aed",
                  },
                },
              }}
            >
              <Group gap="xs" justify="center">
                <Badge variant="filled" color={formatColors[from]} size="sm" radius="sm">
                  {from}
                </Badge>
                <TbArrowRight size={14} color="#868e96" />
                <Badge variant="filled" color={formatColors[to]} size="sm" radius="sm">
                  {to}
                </Badge>
              </Group>
            </Card>
          ))}
        </SimpleGrid>

        {/* Schema & Tools Section */}
        <Group gap="sm" mb="lg">
          <ThemeIcon size="lg" radius="md" variant="light" color="teal">
            <TbSchema size={20} />
          </ThemeIcon>
          <Title order={2} c={isDarkMode ? "white" : "dark"}>
            Developer Tools
          </Title>
        </Group>
        <Text c="dimmed" mb="xl" maw={500}>
          Generate JSON schemas and embed the visualizer in your own projects.
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <Card
            component={Link}
            href="/tools/json-schema"
            padding="xl"
            radius="lg"
            withBorder
            style={{
              cursor: "pointer",
              transition: "all 0.2s ease",
              borderColor: isDarkMode ? "#2a2a3e" : "#e9ecef",
              background: isDarkMode ? "#1a1a2e" : "#ffffff",
            }}
            styles={{
              root: {
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: isDarkMode
                    ? "0 4px 12px rgba(0,0,0,0.3)"
                    : "0 4px 12px rgba(0,0,0,0.08)",
                  borderColor: "#7c3aed",
                },
              },
            }}
          >
            <Group gap="md">
              <ThemeIcon size={48} radius="md" variant="light" color="violet">
                <TbSchema size={24} />
              </ThemeIcon>
              <div>
                <Text fw={600} c={isDarkMode ? "white" : "dark"} size="lg">
                  JSON Schema Generator
                </Text>
                <Text size="sm" c="dimmed">
                  Create validation schemas from your JSON data automatically
                </Text>
              </div>
            </Group>
          </Card>
        </SimpleGrid>
      </Container>

      <Footer isDarkMode={isDarkMode} />
    </Layout>
  );
};

export default HomePage;
