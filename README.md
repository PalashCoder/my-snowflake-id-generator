# Snowflake Id Generator

```
npm install my-snowflake-id-generator
```

Then

```
const SnowflakeGenerator = require('snowflake-id-generator');
const generator = new SnowflakeGenerator(1, 1);

// Generate a numeric ID of length 16
console.log(generator.generateId(16));

// Generate a hexadecimal ID of length 16
console.log(generator.generateId(16, true));
```
## If you want to generate the hexadecimal snowflake then use true or else false/nothing.

now you can use this package's snowflake id in your project.