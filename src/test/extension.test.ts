import("chai");
var expect = require("chai");
import * as extension from "../../src/extension";

describe("VSCode Extension Tests", () => {
  describe("detectLanguage function", () => {
    it("should detect JavaScript language", () => {
      const code = "import React from 'react';\nconst a = 5;";
      const result = extension.detectLanguage(code);
      expect(result).to.equal("javascript");
    });

    it("should detect Python language", () => {
      const code = "class MyClass:\n    def __init__(self):\n        pass";
      const result = extension.detectLanguage(code);
      expect(result).to.equal("python");
    });

    it("should detect C++ language", () => {
      const code = "#include <iostream>\nint main() { return 0; }";
      const result = extension.detectLanguage(code);
      expect(result).to.equal("cpp");
    });

    it("should detect Java language", () => {
      const code =
        "public class MyClass {\n    public static void main(String[] args) {}";
      const result = extension.detectLanguage(code);
      expect(result).to.equal("java");
    });

    it("should return null for unknown language", () => {
      const code = "some random text";
      const result = extension.detectLanguage(code);
      expect(result).to.be.null;
    });
  });

  describe("extractClassName function", () => {
    it("should extract class name from JavaScript", () => {
      const code = "class MyClass { constructor() {} }";
      const result = extension.extractClassName(code, "javascript");
      expect(result).to.equal("MyClass");
    });

    it("should extract class name from Python", () => {
      const code = "class MyClass:\n    def __init__(self):\n        pass";
      const result = extension.extractClassName(code, "python");
      expect(result).to.equal("MyClass");
    });

    it("should extract class name from C++", () => {
      const code = "class MyClass {\npublic:\n    MyClass() {}";
      const result = extension.extractClassName(code, "cpp");
      expect(result).to.equal("MyClass");
    });

    it("should extract class name from Java", () => {
      const code =
        "public class MyClass {\n    public static void main(String[] args) {}";
      const result = extension.extractClassName(code, "java");
      expect(result).to.equal("MyClass");
    });

    it("should return null if no class name is found", () => {
      const code = "def some_function():\n    pass";
      const result = extension.extractClassName(code, "python");
      expect(result).to.be.null;
    });
  });

  describe("getFileExtension function", () => {
    it("should return 'js' for JavaScript", () => {
      const result = extension.getFileExtension("javascript");
      expect(result).to.equal("js");
    });

    it("should return 'py' for Python", () => {
      const result = extension.getFileExtension("python");
      expect(result).to.equal("py");
    });

    it("should return 'cpp' for C++", () => {
      const result = extension.getFileExtension("cpp");
      expect(result).to.equal("cpp");
    });

    it("should return 'java' for Java", () => {
      const result = extension.getFileExtension("java");
      expect(result).to.equal("java");
    });

    it("should return 'cs' for C#", () => {
      const result = extension.getFileExtension("csharp");
      expect(result).to.equal("cs");
    });

    it("should return 'txt' for unknown language", () => {
      const result = extension.getFileExtension("unknown");
      expect(result).to.equal("txt");
    });
  });
});
