import * as vscode from "vscode";

export enum DecorationType {
  override = "override",
  implement = "implement",
}

export interface MarkOptions {
  type: DecorationType;
  range: ts.TextRange;
}

export type DocumentsMarks = Map<string, MarkOptions[]>;

export interface Provider {
  getDocumentsMarks(documents: vscode.TextDocument[]): Promise<DocumentsMarks>;
  getDecoration?(type: DecorationType): vscode.TextEditorDecorationType;
}

export interface OverrideMarkApi {
  addProvider(provider: Provider): void;
}

export function toDecorationOptions(document: vscode.TextDocument) {
  return (options: MarkOptions): vscode.DecorationOptions => {
    const { range } = options;
    return {
      range: new vscode.Range(
        document.positionAt(range.pos),
        document.positionAt(range.end)
      ),
    };
  };
}
