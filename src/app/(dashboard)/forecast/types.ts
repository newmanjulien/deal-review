export type QuadrantPoint = {
  id: string;
  label: string;
  x: number;
  y: number;
  description: string;
  xPx: number;
  yPx: number;
  labelOffset: number;
  labelAnchor: "start" | "end";
  color: string;
};

export type QuadrantChartLayout = {
  dimensions: { width: number; height: number };
  plotArea: { left: number; right: number; top: number; bottom: number };
  axisLabelOffset: { x: number; y: number };
  ticks: { value: number; x: number; y: number }[];
  midLines: { x: number; y: number };
};

export type QuadrantChartData = {
  id: string;
  title: string;
  subtitle: string;
  xLabel: string;
  yLabel: string;
  xMid: number;
  yMid: number;
  disagreeThreshold: number;
  layout: QuadrantChartLayout;
  points: QuadrantPoint[];
};
