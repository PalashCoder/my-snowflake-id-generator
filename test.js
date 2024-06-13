const { expect } = require("chai");
const SnowflakeGenerator = require("./server");

describe("SnowflakeGenerator", () => {
  it("should generate unique IDs", () => {
    const generator = new SnowflakeGenerator(1, 1);
    const id1 = generator.generateId();
    const id2 = generator.generateId();
    expect(id1).to.not.equal(id2);
  });

  it("should generate IDs of specified length", () => {
    const generator = new SnowflakeGenerator(1, 1);
    const id = generator.generateId(10);
    expect(id.length).to.equal(10);
  });

  it("should generate hexadecimal IDs of specified length", () => {
    const generator = new SnowflakeGenerator(1, 1);
    const id = generator.generateId(10, true);
    expect(id.length).to.equal(10);
    expect(id).to.match(/^[0-9a-fA-F]+$/);
  });

  it("should pad IDs with zeros if length is greater than the ID length", () => {
    const generator = new SnowflakeGenerator(1, 1);
    const id = generator.generateId(20);
    expect(id.length).to.equal(20);
    expect(id.startsWith("0")).to.be.true;
  });

  it("should slice IDs if length is less than the ID length", () => {
    const generator = new SnowflakeGenerator(1, 1);
    const id = generator.generateId(5);
    expect(id.length).to.equal(5);
  });
});
