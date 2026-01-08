let cooldownUntil = 0;

export function inCooldown() {
  return Date.now() < cooldownUntil;
}

export function setCooldown(ms: number) {
  cooldownUntil = Date.now() + ms;
}