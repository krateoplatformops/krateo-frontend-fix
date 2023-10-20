import { ReactNode } from "react";

export type PanelProps = {
  title: string;
  tooltip?: string;
  content: ReactNode;
  footer?: ReactNode[];
}