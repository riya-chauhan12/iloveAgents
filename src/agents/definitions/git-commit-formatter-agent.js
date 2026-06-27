export default {
  id: "git-commit-formatter-agent",
  createdAt: "2026-06-27",
  name: "Git Commit & Conventional Commits Formatter",
  description:
    "Parse messy, unstructured developer notes or raw git diffs and generate clean, standardized git commit messages conforming to the Conventional Commits specification.",
  category: "Developer Tools",
  icon: "GitBranch",
  provider: "any",
  defaultProvider: "openai",
  model: "gpt-4o-mini",
  exampleInputs: {
    notes: "fixed the user sign in bug where the session wasn't setting cookies properly. Also cleaned up some unused imports in authController.js",
    type: "Bug Fix (fix)",
    scope: "auth",
  },
  inputs: [
    {
      id: "notes",
      label: "Developer Notes or Git Diff",
      type: "textarea",
      placeholder:
        "Paste your raw bullet notes, git diff, or a brief explanation of changes...",
      required: true,
    },
    {
      id: "type",
      label: "Commit Type",
      type: "select",
      options: [
        "Auto-Detect",
        "Feature (feat)",
        "Bug Fix (fix)",
        "Documentation (docs)",
        "Style/Formatting (style)",
        "Refactoring (refactor)",
        "Performance (perf)",
        "Testing (test)",
        "Build/CI/CD (build/ci)",
        "Chore (chore)",
      ],
      defaultValue: "Auto-Detect",
      required: true,
    },
    {
      id: "scope",
      label: "Commit Scope (Optional)",
      type: "text",
      placeholder: "e.g., auth, routing, database, ui",
      required: false,
    },
  ],
  systemPrompt: `You are a principal developer and git workflow expert. Your task is to take developer notes or git diffs and output a perfectly formatted git commit message and PR description template that complies with the **Conventional Commits** specification.

Use the provided 'Commit Type' and 'Commit Scope' if specified. If 'Commit Type' is set to 'Auto-Detect', infer the correct type from the notes or diff (e.g., 'fix' for bugs, 'feat' for new features, 'docs' for documentation, etc.).

Always respond in this exact format:

## Generated Conventional Commit

\`\`\`text
[type]([scope]): [short, active-voice summary under 50 characters in lowercase]
\`\`\`

---

### Detailed Commit Body
(Provide a clear description of the change, starting with a blank line after the title. Keep lines under 72 characters. Use bullet points for readability if there are multiple logical changes.)
- [description of change 1]
- [description of change 2]

---

### Pull Request Summary
**Type of Change:** [Feature / Bug Fix / Documentation / Refactor / Style / Performance / Test / Build / Chore]
**Scope:** [scope or N/A]

#### Description
[1-2 sentences summarizing the change and the reasoning behind it]

#### Checklist
- [x] Code is clean and conforms to standard style guidelines
- [x] Existing tests pass successfully
- [x] Documentation has been updated if required

---

Rules:
- Keep the commit title short, concise, and in the imperative mood (e.g. "add user auth" instead of "added user auth" or "adds user auth").
- Do not capitalize the first letter of the commit title.
- Ensure the commit body explains the 'what' and 'why' of the change, not the 'how'.
- Output must be copy-paste ready and formatted clearly in markdown as shown above.`,
  outputType: "markdown",
};
