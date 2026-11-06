const dock = document.querySelector<HTMLElement>('.dock');
const icons = [...document.querySelectorAll<HTMLAnchorElement>('.dock__icon')];
const baseSize = icons[0] ? parseFloat(getComputedStyle(icons[0]).width) : 0;
const maxSize = 60;
const influenceRadius = 50;

const smoothstep = (t: number) => t * t * (3 - 2 * t);

const sizeFromDistance = (distance: number) => {
  const closeness = Math.max(0, 1 - distance / influenceRadius);

  return baseSize + (maxSize - baseSize) * smoothstep(closeness);
};

const sizesAt = (pointerX: number, centers: number[]) =>
  centers.map((centerX) => sizeFromDistance(Math.abs(pointerX - centerX)));

const applySizes = (sizes: number[]) => {
  icons.forEach((icon, index) => {
    const scale = baseSize === 0 ? 1 : sizes[index] / baseSize;

    icon.style.transform = `scale(${scale})`;
  });
};

const resetSizes = () => {
  applySizes(icons.map(() => baseSize));
};

const measureCenters = () => {
  resetSizes();

  return icons.map((icon) => {
    const rect = icon.getBoundingClientRect();
    return rect.left + rect.width / 2;
  });
};

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && dock) {
  let centers: number[] = [];

  dock.addEventListener('mouseenter', () => {
    centers = measureCenters();
  });

  dock.addEventListener('mousemove', (event) => {
    applySizes(sizesAt(event.clientX, centers));
  });

  dock.addEventListener('mouseleave', () => {
    centers = [];
    resetSizes();
  });

  dock.addEventListener('scroll', () => {
    if (centers.length === 0) return;
    centers = measureCenters();
  });
}