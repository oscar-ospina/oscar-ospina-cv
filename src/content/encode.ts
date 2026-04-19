const SALT = "x";

export function encodeContact(value: string): string {
  if (typeof window === "undefined") {
    return SALT + Buffer.from(value, "utf8").toString("base64");
  }
  return SALT + btoa(value);
}

export function decodeContact(encoded: string): string {
  const body = encoded.startsWith(SALT) ? encoded.slice(SALT.length) : encoded;
  if (typeof window === "undefined") {
    return Buffer.from(body, "base64").toString("utf8");
  }
  return atob(body);
}
