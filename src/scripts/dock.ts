const dock = document.querySelector<HTMLElement>('.dock');
const icons = [...document.querySelectorAll<HTMLAnchorElement>('.dock__icon')];
const list = dock?.querySelector<HTMLElement>('.dock__list');
const baseSize = icons[0] ? parseFloat(getComputedStyle(icons[0]).width) : 0;
const maxSize = 60;
const influenceRadius = 50;
const gap = list ? parseFloat(getComputedStyle(list).columnGap) : 0;

const smoothstep = (t: number) => t * t * (3 - 2 * t);

const sizeFromDistance = (distance: number) => {
  const closeness = Math.max(0, 1 - distance / influenceRadius);


  return baseSize + (maxSize - baseSize) * smoothstep(closeness);
};

const iconCenters = () => {
  if (!dock) return [];

  const dockRect = dock.getBoundingClientRect();
  const dockCenterX = dockRect.left + dockRect.width / 2;
  const restingWidth = icons.length * baseSize + (icons.length - 1) * gap;
  const firstCenterX = dockCenterX - restingWidth / 2 + baseSize / 2;

  return icons.map((_, index) => firstCenterX + index * (baseSize + gap));
};

const sizesAt = (pointerX: number, centers: number[]) =>
  centers.map((centerX) => {
    const distance = Math.abs(pointerX - centerX);
    
    return sizeFromDistance(distance);
  });

const applySizes = (sizes: number[]) => {
  icons.forEach((icon, index) => {
    const scale = baseSize === 0 ? 1 : sizes[index] / baseSize;

    icon.style.transform = `scale(${scale})`;
  });
};

const resetSizes = () => {
  applySizes(icons.map(() => baseSize));
};

dock?.addEventListener('mousemove', (event) => { applySizes(sizesAt(event.clientX, iconCenters())); });
dock?.addEventListener('mouseleave', resetSizes);