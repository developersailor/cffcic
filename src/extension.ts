import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.createFileFromClipboard",
    async () => {
      try {
        const clipboardContent = await vscode.env.clipboard.readText();
        const language = detectLanguage(clipboardContent);

        if (!language) {
          vscode.window.showErrorMessage("Could not detect language.");
          return;
        }

        let className = extractClassName(clipboardContent, language);

        if (!className) {
          const input = await vscode.window.showInputBox({
            prompt: "Class name not found. Enter a file name:",
          });
          className = input !== undefined ? input : null;
          if (!className) {
            vscode.window.showErrorMessage("File creation cancelled.");
            return;
          }
        }

        const fileExtension = getFileExtension(language);
        const folderPath = await vscode.window.showOpenDialog({
          canSelectFolders: true,
          openLabel: "Select folder for file",
        });

        if (!folderPath) {
          vscode.window.showErrorMessage("Folder selection cancelled.");
          return;
        }

        const filePath = vscode.Uri.joinPath(
          folderPath[0],
          `${className}.${fileExtension}`
        );
        await vscode.workspace.fs.writeFile(
          filePath,
          new Uint8Array(Buffer.from(clipboardContent))
        );

        vscode.window.showTextDocument(filePath);
        vscode.window.showInformationMessage("File created successfully!");
      } catch (error) {
        vscode.window.showErrorMessage(
          `Error creating file: ${(error as any).message}`
        );
        console.error(error);
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function detectLanguage(code: string): string | null {
  if (
    code.startsWith("import") ||
    code.includes("function") ||
    code.includes("const") ||
    code.includes("let")
  ) {
    return "javascript";
  } else if (code.includes("class") && code.includes("def")) {
    return "python";
  } else if (code.includes("#include") || code.includes("int main")) {
    return "cpp";
  } else if (
    code.includes("public class") ||
    code.includes("System.out.println")
  ) {
    return "java";
  } else if (
    code.includes("namespace") ||
    code.includes("public static void Main")
  ) {
    return "csharp";
  }
  return null;
}

export function extractClassName(
  code: string,
  language: string
): string | null {
  switch (language) {
    case "javascript":
      const jsMatch = code.match(/class\s+(\w+)/);
      return jsMatch ? jsMatch[1] : null;
    case "python":
      const pyMatch = code.match(/class\s+(\w+)\s*:/);
      return pyMatch ? pyMatch[1] : null;
    case "cpp":
      const cppMatch = code.match(/class\s+(\w+)\s*{/);
      return cppMatch ? cppMatch[1] : null;
    case "java":
      const javaMatch = code.match(/public\s+class\s+(\w+)/);
      return javaMatch ? javaMatch[1] : null;
    case "csharp":
      const csMatch = code.match(/class\s+(\w+)/);
      return csMatch ? csMatch[1] : null;
    default:
      return null;
  }
}

export function getFileExtension(language: string): string {
  switch (language) {
    case "javascript":
      return "js";
    case "typescript":
      return "ts";
    case "python":
      return "py";
    case "cpp":
      return "cpp";
    case "java":
      return "java";
    case "csharp":
      return "cs";
    default:
      return "txt";
  }
}

export function deactivate() {}
