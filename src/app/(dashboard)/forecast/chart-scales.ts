export function linearScale(
  domainMin: number,
  domainMax: number,
  rangeMin: number,
  rangeMax: number,
) {
  const span = domainMax - domainMin;
  const range = rangeMax - rangeMin;

  if (span === 0) {
    return () => rangeMin;
  }

  return (value: number) => rangeMin + ((value - domainMin) / span) * range;
}

export function ticksLinear(max: number, count: number) {
  if (count <= 0) return [0, max];
  const step = max / count;
  return Array.from({ length: count + 1 }, (_, index) =>
    Math.round(step * index),
  );
}
