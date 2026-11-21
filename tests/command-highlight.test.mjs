import { test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "vite";

test("lazy Shiki grammars preserve command whitespace and provide both theme palettes", async () => {
  const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: "custom" });
  try {
    const { highlightCommand } = await server.ssrLoadModule("/src/features/command-cheatsheet/command-highlight.ts");
    const samples = [
      ["bash", 'git commit -m "Initial commit"\n  echo "$HOME" | cat > ./output # comment\n'],
      ["shell", "npm install --save-dev typescript"],
      ["powershell", 'Get-ChildItem -Path "$env:USERPROFILE"'],
      ["json", '{\n  "path": "./output", "enabled": true\n}'],
    ];
    for (const [language, code] of samples) {
      const lines = await highlightCommand(code, language);
      assert.equal(lines.map(line => line.map(token => token.content).join("")).join("\n"), code);
      const tokens = lines.flat();
      assert.ok(new Set(tokens.map(token => token.variants.light.color)).size > 1);
      assert.ok(tokens.some(token => token.variants.light.color !== token.variants.dark.color));
    }
  } finally {
    await server.close();
  }
});
