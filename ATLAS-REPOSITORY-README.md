# Manuscript Repository

This repository can hold long-form manuscripts, essays, fragments, research notes, and compilation instructions.

## Suggested structure

```text
/manuscripts
  /atlas
    index.md
    recognition.md
    residue.md
    transmission.md
    emergence.md
  /essay-01
  /essay-02
  /essay-03
/research
/references
/metadata
/exports
```

## Working method

- Keep each major section in its own markdown file.
- Store metadata separately in JSON or YAML if needed.
- Use Git history for versioning.
- Use branches for draft compiles.
- Use pull requests for editorial review.

## Compile workflow

1. Update the source files.
2. Ask the model to compile a target export from selected files.
3. Write the export into `/exports` or a release branch.
4. Tag the version.
