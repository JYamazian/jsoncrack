import React from "react";
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
} from "@mantine/core";
import { NextSeo } from "next-seo";
import { TbArrowsExchange } from "react-icons/tb";
import { SEO } from "../constants/seo";
import Layout from "../layout/PageLayout";

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

const HomePage = () => {
  return (
    <Layout>
      <NextSeo {...SEO} canonical="https://jsoncrack.com" />

      {/* Hero */}
      <Container size="lg" py={60}>
        <Stack align="center" gap="md" mb={60}>
          <Title ta="center" c="dark" fz={{ base: 28, sm: 40 }} fw={700}>
            JSON Crack Tools
          </Title>
          <Text ta="center" c="dimmed" size="lg" maw={500}>
            Visualize, convert, and transform your data with our free tools
          </Text>
          <Button component={Link} href="/editor" size="lg" radius="md" color="violet">
            Open Editor
          </Button>
        </Stack>

        {/* Converters */}
        <Title order={3} c="dark" mb="md">
          Format Converters
        </Title>
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="sm" mb={40}>
          {converters.map(({ from, to, href }) => (
            <Card
              key={href}
              component={Link}
              href={href}
              padding="sm"
              radius="md"
              withBorder
              style={{ cursor: "pointer" }}
            >
              <Group gap="xs" justify="center">
                <Badge variant="light" color="blue" size="sm">
                  {from}
                </Badge>
                <TbArrowsExchange size={14} color="#868e96" />
                <Badge variant="light" color="grape" size="sm">
                  {to}
                </Badge>
              </Group>
            </Card>
          ))}
        </SimpleGrid>

        {/* Type Generators */}
        <Title order={3} c="dark" mb="md">
          Type Generators
        </Title>
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="sm" mb={40}>
          {typeGenerators.map(({ from, to, href }) => (
            <Card
              key={href}
              component={Link}
              href={href}
              padding="sm"
              radius="md"
              withBorder
              style={{ cursor: "pointer" }}
            >
              <Group gap="xs" justify="center">
                <Badge variant="light" color="orange" size="sm">
                  {from}
                </Badge>
                <Text size="xs" c="dimmed">
                  →
                </Text>
                <Badge variant="light" color="pink" size="sm">
                  {to}
                </Badge>
              </Group>
            </Card>
          ))}
        </SimpleGrid>

        {/* Schema */}
        <Title order={3} c="dark" mb="md">
          JSON Schema
        </Title>
        <Card
          component={Link}
          href="/tools/json-schema"
          padding="md"
          radius="md"
          withBorder
          mb={40}
          style={{ cursor: "pointer" }}
        >
          <Text fw={500} c="dark">
            Generate JSON Schema from your data
          </Text>
          <Text size="sm" c="dimmed">
            Create validation schemas automatically
          </Text>
        </Card>
      </Container>
    </Layout>
  );
};

export default HomePage;
