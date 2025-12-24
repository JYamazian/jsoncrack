import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Flex,
  Paper,
  Text,
  Title,
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
import { LuCheck, LuCircleX, LuCopy, LuArrowLeftRight, LuArrowRight } from "react-icons/lu";
import { SEO } from "../../constants/seo";
import { type FileFormat, formats } from "../../enums/file.enum";
import { contentToJson, jsonToContent } from "../../lib/utils/jsonAdapter";
import useConfig from "../../store/useConfig";
import Layout from "../PageLayout";
import { editorOptions } from "./options";

interface ToolPageProps {
  from: FileFormat;
  to: FileFormat;
}

const formatColors: Record<string, string> = {
  json: "violet",
  yaml: "blue",
  xml: "teal",
  csv: "orange",
};

export const ToolPage = ({ from, to }: ToolPageProps) => {
  const editorRef = useRef<any>(null);
  const [contentHasError, setContentHasError] = React.useState(false);
  const [originalContent, setOriginalContent] = React.useState("");
  const [convertedContent, setConvertedContent] = React.useState("");
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [editorHeight, setEditorHeight] = React.useState(0);
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
  const toLabel = formats.find(({ value }) => value === to)?.label;

  useEffect(() => {
    if (!originalContent.length) return;

    (async () => {
      try {
        const json = await contentToJson(originalContent, from);
        const content = await jsonToContent(JSON.stringify(json), to);
        setConvertedContent(content);
        setContentHasError(false);
      } catch (_e) {
        setContentHasError(true);
        setConvertedContent("");
      }
    })();
  }, [from, originalContent, to]);

  useEffect(() => {
    const scrollPositionRatio =
      (scrollPosition / editorHeight) * (editorRef.current?.getContentHeight() || 0);

    editorRef.current?.setScrollTop(scrollPositionRatio);
  }, [editorHeight, scrollPosition]);

  return (
    <Layout>
      <NextSeo
        {...SEO}
        title={`${fromLabel} to ${toLabel} | JSON Crack`}
        canonical={`https://jsoncrack.com/converter/${from}-to-${to}`}
        description={`Convert ${fromLabel} to ${toLabel} using this free online tool. Upload your ${fromLabel} file and get the converted ${toLabel} file instantly.`}
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
              <ThemeIcon size="lg" radius="md" variant="light" color="blue">
                <LuArrowLeftRight size={20} />
              </ThemeIcon>
              <Title order={1} c={isDarkMode ? "white" : "dark"} fz={{ base: 24, sm: 32 }}>
                {fromLabel} to {toLabel}
              </Title>
            </Group>
            <Group gap="xs">
              <Badge variant="filled" color={formatColors[from] || "blue"} size="lg" radius="sm">
                {fromLabel}
              </Badge>
              <LuArrowRight size={16} color={isDarkMode ? "#a0a0a0" : "#868e96"} />
              <Badge variant="filled" color={formatColors[to] || "teal"} size="lg" radius="sm">
                {toLabel}
              </Badge>
            </Group>
            <Text c="dimmed" ta="center" maw={500}>
              Paste your {fromLabel} data and instantly convert it to {toLabel} format
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
                  <Badge variant="light" color={formatColors[from] || "blue"} size="sm">
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
              onMount={editor => {
                editor.onDidContentSizeChange(() => {
                  setEditorHeight(editor.getContentHeight());
                });

                editor.onDidScrollChange(e => {
                  setScrollPosition(e.scrollTop);
                });
              }}
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
                  <Badge variant="light" color={formatColors[to] || "teal"} size="sm">
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
