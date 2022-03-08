import { createLogger, format, Logger, transports } from 'winston';

class Winston {
  private static instance: Winston;
  private Logger: Logger;

  private constructor() {
    const { combine, timestamp, prettyPrint, errors, colorize } = format;
    this.Logger = createLogger({
      level: 'info',
      transports: [new transports.Console()],
      format: combine(
        timestamp(),
        errors({ stack: true }),
        prettyPrint(),
        colorize()
      ),
      defaultMeta: { service: 'user-service' },
    });
  }

  public static getInstance(): Winston {
    if (!Winston.instance) {
      Winston.instance = new Winston();
    }
    return Winston.instance;
  }

  public getLogger(): Logger {
    return this.Logger;
  }
}

export default Winston;
