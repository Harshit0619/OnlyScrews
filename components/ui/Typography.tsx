import { TYPOGRAPHY, COLORS } from "@/lib/theme";
import { CSSProperties, ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function H1({ children, className = "", style }: TypographyProps) {
  return (
    <h1
      className={`text-gray-900 ${className}`}
      style={{
        ...TYPOGRAPHY.h1,
        ...style,
      }}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className = "", style }: TypographyProps) {
  return (
    <h2
      className={`text-gray-900 ${className}`}
      style={{
        ...TYPOGRAPHY.h2,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className = "", style }: TypographyProps) {
  return (
    <h3
      className={`text-gray-900 ${className}`}
      style={{
        ...TYPOGRAPHY.h3,
        ...style,
      }}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className = "", style }: TypographyProps) {
  return (
    <h4
      className={`text-gray-900 ${className}`}
      style={{
        ...TYPOGRAPHY.h4,
        ...style,
      }}
    >
      {children}
    </h4>
  );
}

export function Subtitle({ children, className = "", style }: TypographyProps) {
  return (
    <p
      className={`text-gray-700 ${className}`}
      style={{
        ...TYPOGRAPHY.subtitle,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

export function Body({ children, className = "", style }: TypographyProps) {
  return (
    <p
      className={`text-gray-700 ${className}`}
      style={{
        ...TYPOGRAPHY.body,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

export function Small({ children, className = "", style }: TypographyProps) {
  return (
    <p
      className={`text-gray-600 ${className}`}
      style={{
        ...TYPOGRAPHY.small,
        ...style,
      }}
    >
      {children}
    </p>
  );
}
