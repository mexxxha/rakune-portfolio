const boot = document.querySelector<HTMLElement>('#boot');
const log = document.querySelector<HTMLElement>('#boot-log');

const lines = ['RAKUNE POST 1.00', 'A20   GATE            ON', 'MEM   000000-09FFFF   OK', 'MEM   100000-FFFFFF   OK', 'LOAD  RAKUNE.SYS', '0000:7C00  4F8A  OK', '0000:7E40  91AE  OK', '0000:8120  07B3  OK', '0010:0000  C42E  OK', '0010:1A20  8811  OK', '0010:3460  D07C  OK', '0010:4EA0  3B90  OK', '0010:6900  E644  OK', '0010:8340  19FA  OK', '0010:9D80  720D  OK', '0010:B7C0  A563  OK', '0010:D200  5EB8  OK', '0010:EC40  C127  OK', 'CSUM  7F3A:E21C  OK'];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const pushLine = (text: string) => {
  if (!log) return;

  const line = document.createElement('p');
  line.className = 'boot__line';
  line.textContent = text;
  log.append(line);

  while (log.children.length > 8) log.firstElementChild?.remove();
};

const run = async () => {
  if (!boot || !log) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce) {
    pushLine('C:\\RAKUNE> Go');
    await wait(400);
    boot.remove();
    return;
  }

  const pauseAt = new Map<number, number>([
    [2, 480],
    [4, 720],
    [14, 420],
  ]);

  for (const [index, line] of lines.entries()) {
    pushLine(line);
    await wait(pauseAt.get(index) ?? 28);
  }

  const prompt = document.createElement('p');
  prompt.className = 'boot__line';
  prompt.textContent = 'C:\\RAKUNE> ';

  const cursor = document.createElement('span');
  cursor.className = 'boot__cursor';
  prompt.append(cursor);
  log.append(prompt);

  while (log.children.length > 8) log.firstElementChild?.remove();

  await wait(1060);

  for (const char of 'Go') {
    cursor.before(char);
    await wait(140);
  }

  await wait(530);
  boot.remove();
};

run();

export {};
