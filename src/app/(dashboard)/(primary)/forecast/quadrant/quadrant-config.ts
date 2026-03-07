export const QUADRANT_EXAMPLE_CHART_CONFIG = {
  id: "example-quadrant",
  title: "Find opportunities by comparing your two forecasts",
  subtitle:
    "Overbase does an in-depth audit which gives you a second forecast that you can compare with your current forecast to find hidden sales opportunities.",
  xLabel: "Current close probability",
  yLabel: "Overbase close probability",
} as const;

export const QUADRANT_LAYOUT_CONFIG = {
  dimensions: {
    width: 720,
    height: 520,
  },
  padding: {
    top: 28,
    right: 24,
    bottom: 64,
    left: 72,
  },
  axisLabelOffset: {
    x: 65,
    y: 65,
  },
  xMid: 50,
  yMid: 50,
} as const;

export const QUADRANT_BEHAVIOR_CONFIG = {
  disagreeThreshold: 6,
  defaultPointId: "q18",
  labelRightEdgeThreshold: 78,
} as const;

export const QUADRANT_TOOLTIP_CONFIG = {
  width: 320,
  offset: { x: 12, y: -92 },
  edgePadding: 12,
} as const;
