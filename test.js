const { expect } = require("chai");
const SnowflakeGenerator = require("./server");

describe("SnowflakeGenerator", () => {
  it("should generate unique IDs", () => {
    const generator = new SnowflakeGenerator(1, 1);
    const id1 = generator.generateId();
    const id2 = generator.generateId();
    expect(id1).to.not.equal(id2);
  });
});
