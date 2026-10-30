// 準備（1 より前に一度だけ）
// 0-1 dock から .dock__list を取り、list にする
// 0-2 icons[0] の CSS の width を baseSize にする
// 0-3 list の CSS の column-gap を gap にする
// baseSize と gap は 3・8・12 へ渡す。拡大後に読むと拡大中の値になる
//
// マウス移動の受け渡し順（この番号でたどる）
// 1  mousemove が event を受け取る
// 2  event.clientX を sizesAt の pointerX へ渡す
// 3  iconCenters() の戻り値を sizesAt の centers へ渡す
// 4  pointerX と centerX の差を distance にする
// 5  distance を sizeFromDistance へ渡す
// 6  distance と influenceRadius から closeness を作る
// 7  closeness を smoothstep の t へ渡す
// 8  baseSize、maxSize、smoothstep の戻り値から size を返す
// 9  size の配列を applySizes の sizes へ渡す
// 10 sizes[index] を icon.style.width と height へ書く
//
// マウスが離れたとき
// 11 mouseleave が resetSizes を呼ぶ
// 12 baseSize をアイコン数ぶん並べ、9 と同じ applySizes へ渡す

// 0-1 と 3 と 12 で使う。ドック本体
const dock = document.querySelector<HTMLElement>('.dock');
// 0-2 と 3 と 10 で使う。拡大するアイコンの一覧
const icons = [...document.querySelectorAll<HTMLAnchorElement>('.dock__icon')];
// 0-1. dock からリストを受け取り、0-3 で gap を読むために使う
const list = dock?.querySelector<HTMLElement>('.dock__list');

// 0-2. icons[0] の計算済み width を受け取り、3・8・12 へ渡す。静止時の一辺（px）
const baseSize = icons[0] ? parseFloat(getComputedStyle(icons[0]).width) : 0;
// 8 へ渡す。ポインタ直上の最大サイズ（px）
const maxSize = 70;
// 6 へ渡す。この距離（px）を超えると拡大しない
const influenceRadius = 40;
// 0-3. list の計算済み column-gap を受け取り、3 へ渡す。アイコン同士の間隔（px）
const gap = list ? parseFloat(getComputedStyle(list).columnGap) : 0;

// 7 から呼ばれる。t を受け取り、緩やかにした値を 8 へ返す
const smoothstep = (t: number) => t * t * (3 - 2 * t);

// 5 から呼ばれる。distance を受け取り、size を 4 へ返す
const sizeFromDistance = (distance: number) => {
  // 6. distance と influenceRadius から closeness を作る
  const closeness = Math.max(0, 1 - distance / influenceRadius);

  // 7. closeness を t として smoothstep へ渡し、8 で size にする
  return baseSize + (maxSize - baseSize) * smoothstep(closeness);
};

// 3 から呼ばれる。centers を sizesAt の第2引数へ返す
const iconCenters = () => {
  // dock が無いときは空配列を 3 へ返す
  if (!dock) return [];

  // 3-1. dock から画面上の位置を受け取る
  const dockRect = dock.getBoundingClientRect();

  // 3-2. dockRect からドックの水平中心を作る
  const dockCenterX = dockRect.left + dockRect.width / 2;

  // 3-3. icons、baseSize、gap から静止時の列幅を作る
  const restingWidth = icons.length * baseSize + (icons.length - 1) * gap;

  // 3-4. dockCenterX、restingWidth、baseSize から左端アイコンの中心を作る
  const firstCenterX = dockCenterX - restingWidth / 2 + baseSize / 2;

  // 3-5. firstCenterX、index、baseSize、gap から各中心を作り、3 へ返す
  // 拡大中の実測値は位置が動くので、静止サイズから求める
  return icons.map((_, index) => firstCenterX + index * (baseSize + gap));
};

// 2 と 3 から呼ばれる。pointerX と centers を受け取り、sizes を 9 へ返す
const sizesAt = (pointerX: number, centers: number[]) =>
  centers.map((centerX) => {
    // 4. pointerX と centerX の差を distance にする
    const distance = Math.abs(pointerX - centerX);
    
    // 5. distance を sizeFromDistance へ渡す
    return sizeFromDistance(distance);
  });

// 9 と 12 から呼ばれる。sizes を受け取り、10 で各アイコンへ書く
const applySizes = (sizes: number[]) => {
  icons.forEach((icon, index) => {
    // 10. sizes[index] を px 文字列にする
    const size = `${sizes[index]}px`;

    // 10. size を横幅へ書く
    icon.style.width = size;

    // 10. 同じ size を高さへ書く
    icon.style.height = size;
  });
};

// 11 から呼ばれる。baseSize の配列を 12 として applySizes へ渡す
const resetSizes = () => {
  applySizes(icons.map(() => baseSize));
};

// 1. マウス移動で event を受け取る
dock?.addEventListener('mousemove', (event) => {
  // 2. event.clientX → pointerX
  // 3. iconCenters() → centers
  // その結果の sizes を 9 として applySizes へ渡す
  applySizes(sizesAt(event.clientX, iconCenters()));
});

// 11. ドックの外に出たら resetSizes を呼ぶ
dock?.addEventListener('mouseleave', resetSizes);