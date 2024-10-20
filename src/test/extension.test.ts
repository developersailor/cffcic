import * as chai from "chai";

import * as ext from "../extension.js";

describe("VSCode ext Tests", () => {
  const expect: Chai.ExpectStatic = chai.expect;
  describe("detectLanguage function", () => {
    it("should detect JavaScript language", () => {
      const code = "import React from 'react';\nconst a = 5;";
      const result = ext.detectLanguage(code);
      expect(result).to.equal("javascript");
    });

    it("should detect Python language", () => {
      const code = "class MyClass:\n    def __init__(self):\n        pass";
      const result = ext.detectLanguage(code);
      expect(result).to.equal("python");
    });

    it("should detect C++ language", () => {
      const code = "#include <iostream>\nint main() { return 0; }";
      const result = ext.detectLanguage(code);
      expect(result).to.equal("cpp");
    });

    it("should detect Java language", () => {
      const code =
        "public class MyClass {\n    public static void main(String[] args) {}";
      const result = ext.detectLanguage(code);
      expect(result).to.equal("java");
    });

    it("should return null for unknown language", () => {
      const code = "some random text";
      const result = ext.detectLanguage(code);
      expect(result).to.be.null;
    });
  });

  describe("extractClassName function", () => {
    it("should extract class name from JavaScript", () => {
      const code = "class MyClass { constructor() {} }";
      const result = ext.extractClassName(code, "javascript");
      expect(result).to.equal("MyClass");
    });

    it("should extract class name from Python", () => {
      const code = "class MyClass:\n    def __init__(self):\n        pass";
      const result = ext.extractClassName(code, "python");
      expect(result).to.equal("MyClass");
    });

    it("should extract class name from C++", () => {
      const code = "class MyClass {\npublic:\n    MyClass() {}";
      const result = ext.extractClassName(code, "cpp");
      expect(result).to.equal("MyClass");
    });

    it("should extract class name from Java", () => {
      const code =
        "public class MyClass {\n    public static void main(String[] args) {}";
      const result = ext.extractClassName(code, "java");
      expect(result).to.equal("MyClass");
    });

    it("should return null if no class name is found", () => {
      const code = "def some_function():\n    pass";
      const result = ext.extractClassName(code, "python");
      expect(result).to.be.null;
    });
  });

  describe("getFileext function", () => {
    it("should return 'js' for JavaScript", () => {
      const result = ext.getFileExtension("javascript");
      expect(result).to.equal("js");
    });

    it("should return 'py' for Python", () => {
      const result = ext.getFileExtension("python");
      expect(result).to.equal("py");
    });

    it("should return 'cpp' for C++", () => {
      const result = ext.getFileExtension("cpp");
      expect(result).to.equal("cpp");
    });

    it("should return 'java' for Java", () => {
      const result = ext.getFileExtension("java");
      expect(result).to.equal("java");
    });

    it("should return 'cs' for C#", () => {
      const result = ext.getFileExtension("csharp");
      expect(result).to.equal("cs");
    });

    it("should return 'txt' for unknown language", () => {
      const result = ext.getFileExtension("unknown");
      expect(result).to.equal("txt");
    });
  });
});
