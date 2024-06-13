class SnowflakeGenerator {
  constructor(datacenterId, machineId, epoch = 1609459200000) {
    this.datacenterId = datacenterId;
    this.machineId = machineId;
    this.epoch = epoch;
    this.sequence = 0;
    this.lastTimestamp = -1;
  }

  _currentTime() {
    return Date.now();
  }

  _waitForNextMillis(lastTimestamp) {
    let timestamp = this._currentTime();
    while (timestamp <= lastTimestamp) {
      timestamp = this._currentTime();
    }
    return timestamp;
  }

  generateId() {
    let timestamp = this._currentTime();

    if (timestamp < this.lastTimestamp) {
      throw new Error("Clock moved backwards. Refusing to generate id.");
    }

    if (this.lastTimestamp === timestamp) {
      this.sequence = (this.sequence + 1) & 0xfff;
      if (this.sequence === 0) {
        timestamp = this._waitForNextMillis(this.lastTimestamp);
      }
    } else {
      this.sequence = 0;
    }

    this.lastTimestamp = timestamp;

    const id =
      ((timestamp - this.epoch) << 22) |
      (this.datacenterId << 17) |
      (this.machineId << 12) |
      this.sequence;

    return id;
  }
}

module.exports = SnowflakeGenerator;
