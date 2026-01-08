let cooldownUntil = 0;
let disabled = false;

export function inCooldown() {
  return disabled || Date.now() < cooldownUntil;
}

export function setCooldown(ms: number) {
  cooldownUntil = Date.now() + ms;
}

export function disableCoversForSession() {
  disabled = true;
}

export function resetCoversForSession() {
  disabled = false;
  cooldownUntil = 0;
}