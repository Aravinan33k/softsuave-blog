---
name: response-format
description: House format for every reply in this repo. Apply to the final message of every question or task, whether it is an explanation, a code change, a bug investigation, or a review. Defines the structure, tone, and file-reference style of the output.
---

# Response format

Apply this to the final message of **every** question or task in this project.
Edit this file to change the format; the rules below are the single source of truth.

## Structure

1. **Answer first.** The first line is the answer, the result, or what changed. No preamble, no restating the question.
2. **Details** (only if needed). Short bullets for the key points: what changed and why, or the reasoning behind the answer.
3. **Verification.** Say what was actually checked (build, lint, tests, browser) and what was not. If something could not be verified, say so plainly. Do not claim success that was not observed.
4. **Next step** (only if there is a real one). One line: a decision needed from the user, or the obvious follow-up.

Skip any section that has nothing to say. A one-line question gets a one-line answer.

## Style

- Plain language, short sentences, no filler, no emojis.
- Reference code as clickable links, e.g. [layout.tsx:12](src/app/layout.tsx#L12), not as backticked paths.
- Use backticks only for code, commands, and identifiers.
- Use a table only for enumerable facts (files, flags, options), not for prose.
- Do not paste large diffs or file contents back; link to the file instead.
- If the answer is uncertain, state the uncertainty once and what would resolve it.

## Code tasks

- Name the files touched and the one-line reason for each.
- Call out anything surprising: skipped steps, pre-existing failures, files changed outside the request.
- Follow AGENTS.md: this Next.js has breaking changes, so the docs in `node_modules/next/dist/docs/` win over memory.
