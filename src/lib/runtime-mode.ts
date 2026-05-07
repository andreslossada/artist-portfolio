const TRUE_VALUES = new Set(["1", "true", "yes", "on"]);

function isEnabled(value: string | undefined) {
  return value ? TRUE_VALUES.has(value.trim().toLowerCase()) : false;
}

export function isDevelopmentContentMode() {
  return isEnabled(process.env.NEXT_PUBLIC_DEVELOPMENT_MODE);
}
