import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Paper,
  Title,
  Text,
  Badge,
  Group,
  ThemeIcon,
  Stack,
  CopyButton,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { Editor, type OnMount } from "@monaco-editor/react";
import { JSONSchemaFaker } from "json-schema-faker";
import { NextSeo } from "next-seo";
import { LuCheck, LuCircleX, LuCopy, LuFileJson, LuSparkles, LuShuffle } from "react-icons/lu";
import { SEO } from "../../constants/seo";
import { FileFormat, TypeLanguage } from "../../enums/file.enum";
import { editorOptions } from "../../layout/ConverterLayout/options";
import Layout from "../../layout/PageLayout";
import { generateType } from "../../lib/utils/generateType";
import { jsonToContent } from "../../lib/utils/jsonAdapter";
import useConfig from "../../store/useConfig";

const JSONSchemaTool = () => {
  const monacoRef = React.useRef<Parameters<OnMount>[1] | null>(null);
  const [jsonError, setJsonError] = React.useState(false);
  const [jsonSchemaError, setJsonSchemaError] = React.useState(false);
  const [json, setJson] = React.useState("");
  const [jsonSchema, setJsonSchema] = React.useState("");
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
      if (themeMode === "auto") setIsDarkMode(mediaQuery.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [themeMode]);

  React.useEffect(() => {
    (monacoRef.current?.languages.json as any)?.jsonDefaults?.setDiagnosticsOptions({
      validate: true,
      allowComments: true,
      enableSchemaRequest: true,
      ...(jsonSchema && {
        schemas: [
          {
            uri: "",
            fileMatch: ["*"],
            schema: jsonSchema,
          },
        ],
      }),
    });
  }, [jsonSchema]);

  const generateJsonSchema = async () => {
    const jsonSchema = await generateType(json, FileFormat.JSON, TypeLanguage.JSON_SCHEMA);
    setJsonSchema(jsonSchema);
  };

  const generateJson = async () => {
    const randomJson = await JSONSchemaFaker.resolve(JSON.parse(jsonSchema));
    const contents = await jsonToContent(JSON.stringify(randomJson, null, 2), FileFormat.JSON);
    setJson(contents);
  };

  return (
    <Layout>
      <NextSeo
        {...SEO}
        title="JSON Schema Validator & Generator"
        description="Use our JSON Schema Validator & Generator tool to easily validate and generate JSON schemas, and generate data from JSON schemas. Simply input your JSON data, generate the corresponding schema, and validate your data with ease."
        canonical="https://jsoncrack.com/tools/json-schema"
      />
      <Box
        style={{
          background: isDarkMode
            ? "linear-gradient(180deg, #1a1a2e 0%, #0a0a0a 100%)"
            : "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
          borderBottom: `1px solid ${isDarkMode ? "#2a2a3e" : "#e9ecef"}`,
          padding: "40px 0",
        }}
      >
        <Container size="xl">
          <Stack gap="md" align="center">
            <Group gap="sm">
              <ThemeIcon size="lg" radius="md" variant="light" color="teal">
                <LuFileJson size={20} />
              </ThemeIcon>
              <Title order={1} c={isDarkMode ? "white" : "dark"} fz={{ base: 24, sm: 32 }}>
                JSON Schema Generator
              </Title>
            </Group>
            <Text c="dimmed" ta="center" maw={600}>
              Generate JSON Schema from your data or create sample JSON from a schema
            </Text>
            <Group gap="md" mt="sm">
              <Button
                onClick={generateJsonSchema}
                size="md"
                radius="md"
                color="teal"
                disabled={!json.length || jsonError}
                leftSection={<LuSparkles size={16} />}
              >
                Generate Schema
              </Button>
              <Button
                onClick={generateJson}
                size="md"
                radius="md"
                variant="light"
                color="violet"
                disabled={!jsonSchema.length || jsonSchemaError}
                leftSection={<LuShuffle size={16} />}
              >
                Generate Sample JSON
              </Button>
            </Group>
          </Stack>
        </Container>
      </Box>
      <Container py="xl" size="xl">
        <Flex gap="lg" direction={{ base: "column", md: "row" }}>
          <Paper
            flex="1"
            radius="lg"
            style={{
              overflow: "hidden",
              border: `1px solid ${isDarkMode ? "#2a2a3e" : "#e9ecef"}`,
              background: isDarkMode ? "#1a1a2e" : "#ffffff",
            }}
          >
            <Box
              p="sm"
              style={{
                background: isDarkMode ? "#252538" : "#f1f3f5",
                borderBottom: `1px solid ${isDarkMode ? "#2a2a3e" : "#e9ecef"}`,
              }}
            >
              <Flex justify="space-between" align="center">
                <Group gap="xs">
                  <Badge variant="light" color="violet" size="sm">
                    JSON
                  </Badge>
                  <Text size="sm" c="dimmed">
                    Input Data
                  </Text>
                </Group>
                {!!json &&
                  (jsonError ? (
                    <Badge
                      color="red"
                      variant="light"
                      size="sm"
                      leftSection={<LuCircleX size={12} />}
                    >
                      Invalid
                    </Badge>
                  ) : (
                    <Badge
                      color="green"
                      variant="light"
                      size="sm"
                      leftSection={<LuCheck size={12} />}
                    >
                      Valid
                    </Badge>
                  ))}
              </Flex>
            </Box>
            <Editor
              value={json}
              onChange={value => setJson(value || "")}
              onValidate={errors => setJsonError(!!errors.length)}
              language="json"
              height={450}
              theme={isDarkMode ? "vs-dark" : "light"}
              options={editorOptions}
              onMount={(_editor, monaco) => (monacoRef.current = monaco)}
            />
          </Paper>
          <Paper
            flex="1"
            radius="lg"
            style={{
              overflow: "hidden",
              border: `1px solid ${isDarkMode ? "#2a2a3e" : "#e9ecef"}`,
              background: isDarkMode ? "#1a1a2e" : "#ffffff",
            }}
          >
            <Box
              p="sm"
              style={{
                background: isDarkMode ? "#252538" : "#f1f3f5",
                borderBottom: `1px solid ${isDarkMode ? "#2a2a3e" : "#e9ecef"}`,
              }}
            >
              <Flex justify="space-between" align="center">
                <Group gap="xs">
                  <Badge variant="light" color="teal" size="sm">
                    Schema
                  </Badge>
                  <Text size="sm" c="dimmed">
                    JSON Schema
                  </Text>
                </Group>
                <Group gap="xs">
                  {!!jsonSchema &&
                    (jsonSchemaError ? (
                      <Badge
                        color="red"
                        variant="light"
                        size="sm"
                        leftSection={<LuCircleX size={12} />}
                      >
                        Invalid
                      </Badge>
                    ) : (
                      <Badge
                        color="green"
                        variant="light"
                        size="sm"
                        leftSection={<LuCheck size={12} />}
                      >
                        Valid
                      </Badge>
                    ))}
                  <CopyButton value={jsonSchema}>
                    {({ copied, copy }) => (
                      <Tooltip label={copied ? "Copied!" : "Copy"}>
                        <ActionIcon
                          variant="subtle"
                          color={copied ? "green" : "gray"}
                          onClick={copy}
                          size="sm"
                        >
                          {copied ? <LuCheck size={14} /> : <LuCopy size={14} />}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                </Group>
              </Flex>
            </Box>
            <Editor
              value={jsonSchema}
              onChange={value => setJsonSchema(value || "")}
              onValidate={errors => setJsonSchemaError(!!errors.length)}
              language="json"
              height={450}
              theme={isDarkMode ? "vs-dark" : "light"}
              options={editorOptions}
            />
          </Paper>
        </Flex>
      </Container>
    </Layout>
  );
};

export default JSONSchemaTool;
