// lib/spotify/coverQueue.ts
type Task<T> = () => Promise<T>;

const MAX_CONCURRENT = 1; 
let active = 0;
const queue: Array<() => void> = [];

function next() {
  if (active >= MAX_CONCURRENT) return;
  const run = queue.shift();
  if (run) run();
}

export function enqueueCoverFetch<T>(task: Task<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const run = async () => {
      active++;
      try {
        const result = await task();
        resolve(result);
      } catch (e) {
        reject(e);
      } finally {
        active--;
        next();
      }
    };

    queue.push(run);
    next();
  });
}
