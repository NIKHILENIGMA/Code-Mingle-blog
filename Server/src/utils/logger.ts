// src/logger.ts
import { createLogger, format, transports } from 'winston';
import * as fs from 'fs';
import * as path from 'path';

// Ensure log directory exists
const logDir = path.join(__dirname, '..','..','logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Configure Winston logger
/* This code snippet is configuring a logger using the Winston library in a TypeScript file. Here's a
breakdown of what it's doing: 

1. It imports the necessary modules from Winston and Node.js.
2. It creates a log directory if it doesn't exist using the `fs` module.
3. It defines the log directory path as `logs`.
4. It creates a new Winston logger instance using the `createLogger` function.
5. It configures the logger with a log level of `info` and a custom log format.
*/

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
  ),
  transports: [
    new transports.File({
      filename: path.join(logDir, 'development.logs'),
      level: 'info',
    }),
  ],
});

// Stream to be used by Morgan
export const winstonStream = {
  write: (message: string) => logger.info(message.trim()),
};

export default logger;
