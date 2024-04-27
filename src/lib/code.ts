type Decoration = {
  start: number;
  end: number;
  properties: { [key: string]: string };
};

export const parseCodeWithInput = (input: string): { code: string; decorations: Decoration[] } => {
  const regex = /\[([^:]+):([^]+?)(?<!\\)\]/g;
  let match;
  let code = "";
  const decorations: Decoration[] = [];

  let lastIndex = 0;
  while ((match = regex.exec(input)) !== null) {
    const [, key, rawValue] = match;
    const value = rawValue.replace(/\\]/g, "]");

    const start = match.index + 1;
    const end = start + key.length + value.length + 2;
    code += input.substring(lastIndex, match.index);
    code += value;
    lastIndex = end;

    decorations.push({
      start: code.length - value.length,
      end: code.length + rawValue.length - value.length,
      properties: { class: `input-${key}` },
    });
  }
  code += input.substring(lastIndex);

  return { code, decorations };
};

export const parseCodeWithButtons = (
  input: string,
): { code: string; decorations: Decoration[] } => {
  const regex = /<([^>]+?)>/g;
  let match;
  let code = "";
  const decorations: Decoration[] = [];

  let lastIndex = 0;
  let index = 0;
  while ((match = regex.exec(input)) !== null) {
    const [, rawValue] = match;
    const value = rawValue;

    const start = match.index;
    const end = start + value.length + 2;
    code += input.substring(lastIndex, match.index);
    code += value;
    lastIndex = end;

    decorations.push({
      start: code.length - value.length,
      end: code.length + rawValue.length - value.length,
      properties: { class: `button-${index}`, "data-button-text": value },
    });
    index++;
  }
  code += input.substring(lastIndex);

  return { code, decorations };
};

export const HIGHLIGHT_OPTIONS = {
  lang: "solidity",
  theme: "aurora-x",
};
