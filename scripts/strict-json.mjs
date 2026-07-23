import { readFileSync } from "node:fs";

export class StrictJsonError extends SyntaxError {
  constructor(message, source = "<json>", offset = 0) {
    super(`${source}:${offset}: ${message}`);
    this.name = "StrictJsonError";
    this.source = source;
    this.offset = offset;
  }
}

export function strictJsonParse(text, source = "<json>") {
  if (typeof text !== "string") {
    throw new TypeError("strictJsonParse requires a string");
  }

  let offset = 0;
  const fail = (message) => {
    throw new StrictJsonError(message, source, offset);
  };
  const whitespace = () => {
    while (offset < text.length && /[\u0009\u000a\u000d\u0020]/.test(text[offset])) offset += 1;
  };
  const parseString = () => {
    if (text[offset] !== "\"") fail("expected JSON string");
    const start = offset;
    offset += 1;
    while (offset < text.length) {
      const code = text.charCodeAt(offset);
      if (code === 0x22) {
        offset += 1;
        try {
          return JSON.parse(text.slice(start, offset));
        } catch {
          fail("invalid JSON string escape");
        }
      }
      if (code < 0x20) fail("unescaped control character in string");
      if (code === 0x5c) {
        offset += 1;
        if (offset >= text.length) fail("unterminated JSON escape");
        if (text[offset] === "u") {
          const hex = text.slice(offset + 1, offset + 5);
          if (!/^[0-9a-fA-F]{4}$/.test(hex)) fail("invalid Unicode escape");
          offset += 5;
          continue;
        }
        if (!/["\\/bfnrt]/.test(text[offset])) fail("invalid JSON escape");
      }
      offset += 1;
    }
    fail("unterminated JSON string");
  };
  const parseNumber = () => {
    const match = text.slice(offset).match(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/);
    if (!match) fail("invalid JSON number");
    offset += match[0].length;
    const value = Number(match[0]);
    if (!Number.isFinite(value)) fail("non-finite JSON number");
    return value;
  };
  const parseValue = (path) => {
    whitespace();
    const token = text[offset];
    if (token === "{") return parseObject(path);
    if (token === "[") return parseArray(path);
    if (token === "\"") return parseString();
    if (token === "-" || /[0-9]/.test(token ?? "")) return parseNumber();
    for (const [literal, value] of [["true", true], ["false", false], ["null", null]]) {
      if (text.startsWith(literal, offset)) {
        offset += literal.length;
        return value;
      }
    }
    fail("unexpected token");
  };
  const parseObject = (path) => {
    offset += 1;
    whitespace();
    const value = Object.create(null);
    const keys = new Set();
    if (text[offset] === "}") {
      offset += 1;
      return value;
    }
    while (offset < text.length) {
      whitespace();
      const keyOffset = offset;
      const key = parseString();
      const normalizedKey = key.normalize("NFKC").toLocaleLowerCase("en-US");
      if (keys.has(normalizedKey)) {
        throw new StrictJsonError(
          `duplicate object key ${JSON.stringify(key)} at ${path}`,
          source,
          keyOffset,
        );
      }
      keys.add(normalizedKey);
      whitespace();
      if (text[offset] !== ":") fail("expected ':' after object key");
      offset += 1;
      value[key] = parseValue(`${path}.${key}`);
      whitespace();
      if (text[offset] === "}") {
        offset += 1;
        return value;
      }
      if (text[offset] !== ",") fail("expected ',' or '}' in object");
      offset += 1;
    }
    fail("unterminated JSON object");
  };
  const parseArray = (path) => {
    offset += 1;
    whitespace();
    const value = [];
    if (text[offset] === "]") {
      offset += 1;
      return value;
    }
    while (offset < text.length) {
      value.push(parseValue(`${path}[${value.length}]`));
      whitespace();
      if (text[offset] === "]") {
        offset += 1;
        return value;
      }
      if (text[offset] !== ",") fail("expected ',' or ']' in array");
      offset += 1;
    }
    fail("unterminated JSON array");
  };

  const value = parseValue("$");
  whitespace();
  if (offset !== text.length) fail("trailing data after JSON value");
  return value;
}

export function readStrictJson(path) {
  return strictJsonParse(readFileSync(path, "utf8"), path);
}
