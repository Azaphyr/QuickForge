declare module 'rollup/parseAst' {
  interface ParseOptions {
    allowReturnOutsideFunction?: boolean;
    ecmaVersion?: number;
    sourceType?: 'script' | 'module';
  }

  interface Node {
    type: string;
    start: number;
    end: number;
    loc: {
      start: { line: number; column: number };
      end: { line: number; column: number };
    };
  }

  interface Comment extends Node {
    type: 'Line' | 'Block';
    value: string;
  }

  interface Token extends Node {
    type: string;
    value: string;
  }

  interface Program extends Node {
    type: 'Program';
    body: Node[];
    sourceType: 'script' | 'module';
  }

  interface ParseResult {
    type: string;
    start: number;
    end: number;
    loc: {
      start: { line: number; column: number };
      end: { line: number; column: number };
    };
    program: Program;
    comments: Comment[];
    tokens: Token[];
  }

  export function parseAst(code: string, options?: ParseOptions): ParseResult;
  export function parseAstAsync(code: string, options?: ParseOptions): Promise<ParseResult>;
} 