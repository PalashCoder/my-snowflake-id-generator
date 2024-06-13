class SnowflakeGenerator {
  constructor(datacenterId, machineId, epoch = 1609459200000) {
    if (datacenterId < 0 || datacenterId > 31) {
      throw new Error("Datacenter ID must be between 0 and 31");
    }
    if (machineId < 0 || machineId > 31) {
      throw new Error("Machine ID must be between 0 and 31");
    }

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

  _generateIdInternal() {
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

    return (
      ((timestamp - this.epoch) << 22) |
      (this.datacenterId << 17) |
      (this.machineId << 12) |
      this.sequence
    );
  }

  generateId(length = 16, asHex = false) {
    let id = this._generateIdInternal();

    if (asHex) {
      id = id.toString(16);
    } else {
      id = id.toString().replace("-", "");
    }

    if (length > id.length) {
      id = id.padStart(length, "0");
    } else if (length < id.length) {
      id = id.slice(-length);
    }

    return id;
  }
}

module.exports = SnowflakeGenerator;
