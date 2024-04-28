export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const hash = (str: string) =>
  Array.from(str).reduce((s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0, 0);
