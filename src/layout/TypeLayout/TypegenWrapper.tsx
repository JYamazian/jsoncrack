import React, { useEffect, useRef, useState } from "react";
import {
  Box,
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
import { Editor } from "@monaco-editor/react";
import { NextSeo } from "next-seo";
import { LuCheck, LuCircleX, LuCopy, LuCode, LuArrowRight } from "react-icons/lu";
import { SEO } from "../../constants/seo";
import { type FileFormat, formats, type TypeLanguage, typeOptions } from "../../enums/file.enum";
import { editorOptions } from "../../layout/ConverterLayout/options";
import Layout from "../../layout/PageLayout";
import { generateType } from "../../lib/utils/generateType";
import useConfig from "../../store/useConfig";

interface ConverterPagesProps {
  from: FileFormat;
  to: TypeLanguage;
}

export const TypegenWrapper = ({ from, to }: ConverterPagesProps) => {
  const editorRef = useRef<any>(null);
  const [contentHasError, setContentHasError] = React.useState(false);
  const [originalContent, setOriginalContent] = React.useState("");
  const [convertedContent, setConvertedContent] = React.useState("");
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

  const fromLabel = formats.find(({ value }) => value === from)?.label;
  const toLabel = typeOptions.find(({ value }) => value === to)?.label;

  useEffect(() => {
    if (!originalContent.length) return;

    (async () => {
      try {
        const type = await generateType(originalContent, from, to);
        setConvertedContent(type);
        setContentHasError(false);
      } catch (_e) {
        setContentHasError(true);
        setConvertedContent("");
      }
    })();
  }, [from, originalContent, to]);

  return (
    <Layout>
      <NextSeo
        {...SEO}
        title={`${fromLabel} to ${toLabel} | JSON Crack`}
        canonical={`https://jsoncrack.com/type/${from}-to-${to}`}
        description={`Instantly generate ${toLabel} types from ${fromLabel} using this free online tool. Paste your ${fromLabel} and get the generated ${toLabel} instantly.`}
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
        <Container size="lg">
          <Stack gap="md" align="center">
            <Group gap="sm">
              <ThemeIcon size="lg" radius="md" variant="light" color="violet">
                <LuCode size={20} />
              </ThemeIcon>
              <Title order={1} c={isDarkMode ? "white" : "dark"} fz={{ base: 24, sm: 32 }}>
                {fromLabel} to {toLabel}
              </Title>
            </Group>
            <Group gap="xs">
              <Badge variant="filled" color="violet" size="lg" radius="sm">
                {fromLabel}
              </Badge>
              <LuArrowRight size={16} color={isDarkMode ? "#a0a0a0" : "#868e96"} />
              <Badge variant="filled" color="grape" size="lg" radius="sm">
                {toLabel}
              </Badge>
            </Group>
            <Text c="dimmed" ta="center" maw={500}>
              Paste your {fromLabel} data and instantly generate {toLabel} type definitions
            </Text>
          </Stack>
        </Container>
      </Box>
      <Container py="xl" size="lg">
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
                    {fromLabel}
                  </Badge>
                  <Text size="sm" c="dimmed">
                    Input
                  </Text>
                </Group>
                {!!originalContent &&
                  (contentHasError ? (
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
              value={originalContent}
              onChange={value => setOriginalContent(value || "")}
              language={from}
              height={450}
              theme={isDarkMode ? "vs-dark" : "light"}
              options={editorOptions}
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
                  <Badge variant="light" color="grape" size="sm">
                    {toLabel}
                  </Badge>
                  <Text size="sm" c="dimmed">
                    Output
                  </Text>
                </Group>
                <CopyButton value={convertedContent}>
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
              </Flex>
            </Box>
            <Editor
              value={convertedContent}
              language={to}
              height={450}
              theme={isDarkMode ? "vs-dark" : "light"}
              options={{
                ...editorOptions,
                readOnly: true,
              }}
              onMount={editor => {
                editorRef.current = editor;
              }}
            />
          </Paper>
        </Flex>
      </Container>
    </Layout>
  );
};
