const palette = {
  "blue": "#11B2E2",
  "orange": "#FFAA00",
  "gray": "#323B40",
  "red": "#F84C4C",
  "green": "#00D690"
}

export const getColorCode = (colorName: string) => {
  return palette[colorName];
}