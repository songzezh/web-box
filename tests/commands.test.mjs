import test from "node:test";
import assert from "node:assert/strict";
import {
  commands,
  commandCategories,
} from "../src/features/command-cheatsheet/data.ts";
import {
  filterCommands,
  copyCommand,
  shouldFocusSearch,
} from "../src/features/command-cheatsheet/filter.ts";

test("catalog has unique IDs, all categories, bilingual descriptions and valid platform metadata", () => {
  assert.ok(commands.length >= 80);
  assert.equal(
    new Set(commands.map((entry) => entry.id)).size,
    commands.length,
  );
  assert.equal(
    new Set(commands.map((entry) => entry.command)).size,
    commands.length,
  );
  for (const category of commandCategories)
    assert.ok(
      commands.filter((entry) => entry.category === category.id).length >= 8,
    );
  for (const entry of commands) {
    assert.ok(
      commandCategories.some((category) => category.id === entry.category),
    );
    for (const text of [
      entry.name,
      entry.description,
      ...(entry.parameters ?? []).map((p) => p.description),
      ...(entry.examples ?? []).map((e) => e.description),
    ]) {
      assert.ok(text.en.trim());
      assert.ok(text.zh.trim());
    }
    assert.ok(entry.platforms.length);
    assert.ok(
      entry.platforms.every((platform) =>
        ["linux", "macos", "windows"].includes(platform),
      ),
    );
    if (entry.risk === "danger")
      assert.ok(entry.warning?.en && entry.warning?.zh);
    for (const placeholder of entry.command.match(/<[^>]+>/g) ?? [])
      assert.ok(
        entry.parameters?.some((parameter) => parameter.name === placeholder),
      );
    for (const example of entry.examples ?? [])
      assert.ok(!/<[^>]+>/.test(example.command));
  }
  assert.deepEqual(
    commands.find((entry) => entry.id === "system-memory").platforms,
    ["linux"],
  );
  assert.deepEqual(
    commands.find((entry) => entry.id === "network-ping-win").platforms,
    ["windows"],
  );
});
test("search combines categories with case-insensitive partial matches across both languages, tags and keywords", () => {
  assert.equal(filterCommands(commands, "").length, commands.length);
  assert.ok(
    filterCommands(commands, "GIT STA").some(
      (entry) => entry.id === "git-status",
    ),
  );
  assert.ok(
    filterCommands(commands, "工作区状态").some(
      (entry) => entry.id === "git-status",
    ),
  );
  assert.ok(
    filterCommands(commands, "changed and staged").some(
      (entry) => entry.id === "git-status",
    ),
  );
  assert.equal(filterCommands(commands, "git", "docker").length, 0);
  assert.equal(filterCommands(commands, "  ", "git").length, 22);
  assert.deepEqual(filterCommands(commands, "not-a-real-command"), []);
  assert.ok(filterCommands(commands, "danger").length >= 3);
});
test("copy preserves exact command and propagates unavailable/denied clipboard failures", async () => {
  let copied;
  await copyCommand("git switch -c <branch-name>", {
    writeText: async (value) => {
      copied = value;
    },
  });
  assert.equal(copied, "git switch -c <branch-name>");
  await assert.rejects(copyCommand("test"), /unavailable/);
  await assert.rejects(
    copyCommand("test", {
      writeText: async () => {
        throw Error("denied");
      },
    }),
    /denied/,
  );
});
test("slash shortcut avoids editable controls, modifiers and IME composition", () => {
  const event = {
    key: "/",
    ctrlKey: false,
    metaKey: false,
    altKey: false,
    isComposing: false,
  };
  assert.ok(shouldFocusSearch(event, null));
  assert.equal(shouldFocusSearch(event, { closest: () => ({}) }), false);
  for (const flag of ["ctrlKey", "metaKey", "altKey", "isComposing"])
    assert.equal(shouldFocusSearch({ ...event, [flag]: true }, null), false);
});
