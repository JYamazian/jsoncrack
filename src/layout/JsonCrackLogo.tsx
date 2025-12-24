import React, { useEffect } from "react";
import localFont from "next/font/local";
import Link from "next/link";
import styled from "styled-components";

const monaSans = localFont({
  src: "../assets/fonts/Mona-Sans.woff2",
  variable: "--mona-sans",
  display: "swap",
  fallback: ["Futura, Helvetica, sans-serif", "Tahoma, Verdana, sans-serif"],
});

const StyledLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LogoIcon = styled.div<{ $darkMode?: boolean }>`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoSvg = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7c3aed" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="6" fill="url(#logoGradient)" />
    <path
      d="M11 8C9 8 8 9 8 11V14C8 16 7 17 5 17C7 17 8 18 8 20V23C8 25 9 26 11 26"
      stroke="white"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M21 8C23 8 24 9 24 11V14C24 16 25 17 27 17C25 17 24 18 24 20V23C24 25 23 26 21 26"
      stroke="white"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    <circle cx="13" cy="13" r="1.5" fill="white" />
    <circle cx="16" cy="17" r="1.5" fill="white" />
    <circle cx="19" cy="21" r="1.5" fill="white" />
  </svg>
);

const StyledTitle = styled.span<{ fontSize: string; $darkMode?: boolean }>`
  font-weight: 700;
  margin: 0;
  font-family: ${monaSans.style.fontFamily} !important;
  font-size: ${({ fontSize }) => fontSize};
  white-space: nowrap;
  z-index: 10;
  vertical-align: middle;
  color: ${({ $darkMode }) => ($darkMode ? "#ffffff" : "#1a1a1a")};
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }
`;

interface LogoProps extends React.ComponentPropsWithoutRef<"div"> {
  fontSize?: string;
  hideLogo?: boolean;
  hideText?: boolean;
  darkMode?: boolean;
}

export const JSONCrackLogo = ({
  fontSize = "1.1rem",
  hideText,
  hideLogo,
  darkMode = false,
  ...props
}: LogoProps) => {
  const [isIframe, setIsIframe] = React.useState(false);

  useEffect(() => {
    setIsIframe(window !== undefined && window.location.href.includes("widget"));
  }, []);

  return (
    <StyledLink href="/" prefetch={false} target={isIframe ? "_blank" : "_self"}>
      <StyledLogoWrapper>
        {!hideLogo && (
          <LogoIcon $darkMode={darkMode}>
            <LogoSvg />
          </LogoIcon>
        )}
        {!hideText && (
          <StyledTitle fontSize={fontSize} $darkMode={darkMode} {...props}>
            JSON Crack
          </StyledTitle>
        )}
      </StyledLogoWrapper>
    </StyledLink>
  );
};
