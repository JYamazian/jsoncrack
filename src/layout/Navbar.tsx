import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Menu, Group, Burger, Drawer, Stack, Divider, NavLink } from "@mantine/core";
import styled from "styled-components";
import { LuChevronDown } from "react-icons/lu";
import { JSONCrackLogo } from "./JsonCrackLogo";

const StyledNavbar = styled.nav<{ $darkMode?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 32px;
  background: ${({ $darkMode }) => ($darkMode ? "#1a1a1a" : "#ffffff")};
  border-bottom: 1px solid ${({ $darkMode }) => ($darkMode ? "#2a2a2a" : "#e9e9e9")};
  z-index: 100;

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

const DesktopMenu = styled.div`
  display: flex;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;

interface NavbarProps {
  darkMode?: boolean;
}

export const Navbar = ({ darkMode = false }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const buttonColor = darkMode ? "gray" : "dark";

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  return (
    <StyledNavbar $darkMode={darkMode}>
      <JSONCrackLogo fontSize="1rem" />

      {/* Desktop Menu */}
      <DesktopMenu>
        <Group gap="xs">
          <Button
            component={Link}
            prefetch={false}
            href="/editor"
            variant="subtle"
            color={buttonColor}
            size="sm"
            radius="md"
          >
            Editor
          </Button>
            <Menu withArrow shadow="sm">
            <Menu.Target>
                <Button
                variant="subtle"
                color={buttonColor}
                size="sm"
                radius="md"
                rightSection={<LuChevronDown size={14} />}
                >
                Converters
                </Button>
            </Menu.Target>
            <Menu.Dropdown maw={280} bg="white">
                <Menu.Label>JSON</Menu.Label>
                <Menu.Item component={Link} href="/converter/json-to-yaml">
                JSON to YAML
                </Menu.Item>
                <Menu.Item component={Link} href="/converter/json-to-xml">
                JSON to XML
                </Menu.Item>
                <Menu.Item component={Link} href="/converter/json-to-csv">
                JSON to CSV
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>YAML</Menu.Label>
                <Menu.Item component={Link} href="/converter/yaml-to-json">
                YAML to JSON
                </Menu.Item>
                <Menu.Item component={Link} href="/converter/yaml-to-xml">
                YAML to XML
                </Menu.Item>
                <Menu.Item component={Link} href="/converter/yaml-to-csv">
                YAML to CSV
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>XML</Menu.Label>
                <Menu.Item component={Link} href="/converter/xml-to-json">
                XML to JSON
                </Menu.Item>
                <Menu.Item component={Link} href="/converter/xml-to-yaml">
                XML to YAML
                </Menu.Item>
                <Menu.Item component={Link} href="/converter/xml-to-csv">
                XML to CSV
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>CSV</Menu.Label>
                <Menu.Item component={Link} href="/converter/csv-to-json">
                CSV to JSON
                </Menu.Item>
                <Menu.Item component={Link} href="/converter/csv-to-yaml">
                CSV to YAML
                </Menu.Item>
                <Menu.Item component={Link} href="/converter/csv-to-xml">
                CSV to XML
                </Menu.Item>
            </Menu.Dropdown>
            </Menu>
            <Menu withArrow shadow="sm">
            <Menu.Target>
                <Button
                variant="subtle"
                color={buttonColor}
                size="sm"
                radius="md"
                rightSection={<LuChevronDown size={14} />}
                >
                Types
                </Button>
            </Menu.Target>
            <Menu.Dropdown maw={280} bg="white">
                <Menu.Label>TypeScript</Menu.Label>
                <Menu.Item component={Link} href="/type/json-to-typescript">
                JSON to TypeScript
                </Menu.Item>
                <Menu.Item component={Link} href="/type/yaml-to-typescript">
                YAML to TypeScript
                </Menu.Item>
                <Menu.Item component={Link} href="/type/xml-to-typescript">
                XML to TypeScript
                </Menu.Item>
                <Menu.Item component={Link} href="/type/csv-to-typescript">
                CSV to TypeScript
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>Go</Menu.Label>
                <Menu.Item component={Link} href="/type/json-to-go">
                JSON to Go
                </Menu.Item>
                <Menu.Item component={Link} href="/type/yaml-to-go">
                YAML to Go
                </Menu.Item>
                <Menu.Item component={Link} href="/type/xml-to-go">
                XML to Go
                </Menu.Item>
                <Menu.Item component={Link} href="/type/csv-to-go">
                CSV to Go
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>Rust</Menu.Label>
                <Menu.Item component={Link} href="/type/json-to-rust">
                JSON to Rust
                </Menu.Item>
                <Menu.Item component={Link} href="/type/yaml-to-rust">
                YAML to Rust
                </Menu.Item>
                <Menu.Item component={Link} href="/type/xml-to-rust">
                XML to Rust
                </Menu.Item>
                <Menu.Item component={Link} href="/type/csv-to-rust">
                CSV to Rust
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>Kotlin</Menu.Label>
                <Menu.Item component={Link} href="/type/json-to-kotlin">
                JSON to Kotlin
                </Menu.Item>
                <Menu.Item component={Link} href="/type/yaml-to-kotlin">
                YAML to Kotlin
                </Menu.Item>
                <Menu.Item component={Link} href="/type/xml-to-kotlin">
                XML to Kotlin
                </Menu.Item>
                <Menu.Item component={Link} href="/type/csv-to-kotlin">
                CSV to Kotlin
                </Menu.Item>
            </Menu.Dropdown>
            </Menu>
            <Button
            component={Link}
            prefetch={false}
            href="/tools/json-schema"
            variant="subtle"
            color={buttonColor}
            size="sm"
            radius="md"
            >
            Schema
            </Button>
      </Group>
      </DesktopMenu>

      {/* Mobile Menu Button */}
      <MobileMenuButton>
        <Burger
          opened={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(o => !o)}
          size="sm"
          color={darkMode ? "#fff" : "#000"}
        />
      </MobileMenuButton>

      {/* Mobile Drawer */}
      <Drawer
        opened={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title="Menu"
        padding="md"
        size="xs"
        position="right"
      >
        <Stack gap="xs">
          <Button
            component={Link}
            href="/editor"
            variant="subtle"
            color="dark"
            fullWidth
            justify="flex-start"
            onClick={() => setMobileMenuOpen(false)}
          >
            Editor
          </Button>

          <NavLink label="Converters" childrenOffset={16}>
            <NavLink label="JSON" childrenOffset={12}>
              <NavLink component={Link} href="/converter/json-to-yaml" label="JSON to YAML" onClick={() => setMobileMenuOpen(false)} />
              <NavLink component={Link} href="/converter/json-to-xml" label="JSON to XML" onClick={() => setMobileMenuOpen(false)} />
              <NavLink component={Link} href="/converter/json-to-csv" label="JSON to CSV" onClick={() => setMobileMenuOpen(false)} />
            </NavLink>
            <NavLink label="YAML" childrenOffset={12}>
              <NavLink component={Link} href="/converter/yaml-to-json" label="YAML to JSON" onClick={() => setMobileMenuOpen(false)} />
              <NavLink component={Link} href="/converter/yaml-to-xml" label="YAML to XML" onClick={() => setMobileMenuOpen(false)} />
              <NavLink component={Link} href="/converter/yaml-to-csv" label="YAML to CSV" onClick={() => setMobileMenuOpen(false)} />
            </NavLink>
            <NavLink label="XML" childrenOffset={12}>
              <NavLink component={Link} href="/converter/xml-to-json" label="XML to JSON" onClick={() => setMobileMenuOpen(false)} />
              <NavLink component={Link} href="/converter/xml-to-yaml" label="XML to YAML" onClick={() => setMobileMenuOpen(false)} />
              <NavLink component={Link} href="/converter/xml-to-csv" label="XML to CSV" onClick={() => setMobileMenuOpen(false)} />
            </NavLink>
            <NavLink label="CSV" childrenOffset={12}>
              <NavLink component={Link} href="/converter/csv-to-json" label="CSV to JSON" onClick={() => setMobileMenuOpen(false)} />
              <NavLink component={Link} href="/converter/csv-to-yaml" label="CSV to YAML" onClick={() => setMobileMenuOpen(false)} />
              <NavLink component={Link} href="/converter/csv-to-xml" label="CSV to XML" onClick={() => setMobileMenuOpen(false)} />
            </NavLink>
          </NavLink>

          <NavLink label="Type Generators" childrenOffset={16}>
            <NavLink label="TypeScript" childrenOffset={12}>
              <NavLink component={Link} href="/type/json-to-typescript" label="JSON to TypeScript" onClick={() => setMobileMenuOpen(false)} />
              <NavLink component={Link} href="/type/yaml-to-typescript" label="YAML to TypeScript" onClick={() => setMobileMenuOpen(false)} />
              <NavLink component={Link} href="/type/xml-to-typescript" label="XML to TypeScript" onClick={() => setMobileMenuOpen(false)} />
              <NavLink component={Link} href="/type/csv-to-typescript" label="CSV to TypeScript" onClick={() => setMobileMenuOpen(false)} />
            </NavLink>
            <NavLink label="Go" childrenOffset={12}>
              <NavLink component={Link} href="/type/json-to-go" label="JSON to Go" onClick={() => setMobileMenuOpen(false)} />
              <NavLink component={Link} href="/type/yaml-to-go" label="YAML to Go" onClick={() => setMobileMenuOpen(false)} />
              <NavLink component={Link} href="/type/xml-to-go" label="XML to Go" onClick={() => setMobileMenuOpen(false)} />
              <NavLink component={Link} href="/type/csv-to-go" label="CSV to Go" onClick={() => setMobileMenuOpen(false)} />
            </NavLink>
            <NavLink label="Rust" childrenOffset={12}>
              <NavLink component={Link} href="/type/json-to-rust" label="JSON to Rust" onClick={() => setMobileMenuOpen(false)} />
              <NavLink component={Link} href="/type/yaml-to-rust" label="YAML to Rust" onClick={() => setMobileMenuOpen(false)} />
              <NavLink component={Link} href="/type/xml-to-rust" label="XML to Rust" onClick={() => setMobileMenuOpen(false)} />
              <NavLink component={Link} href="/type/csv-to-rust" label="CSV to Rust" onClick={() => setMobileMenuOpen(false)} />
            </NavLink>
            <NavLink label="Kotlin" childrenOffset={12}>
              <NavLink component={Link} href="/type/json-to-kotlin" label="JSON to Kotlin" onClick={() => setMobileMenuOpen(false)} />
              <NavLink component={Link} href="/type/yaml-to-kotlin" label="YAML to Kotlin" onClick={() => setMobileMenuOpen(false)} />
              <NavLink component={Link} href="/type/xml-to-kotlin" label="XML to Kotlin" onClick={() => setMobileMenuOpen(false)} />
              <NavLink component={Link} href="/type/csv-to-kotlin" label="CSV to Kotlin" onClick={() => setMobileMenuOpen(false)} />
            </NavLink>
          </NavLink>

          <Divider />

          <Button
            component={Link}
            href="/tools/json-schema"
            variant="subtle"
            color="dark"
            fullWidth
            justify="flex-start"
            onClick={() => setMobileMenuOpen(false)}
          >
            JSON Schema
          </Button>
        </Stack>
      </Drawer>
    </StyledNavbar>
  );
};
