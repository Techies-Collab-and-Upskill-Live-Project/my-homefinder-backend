import { Socket } from "socket.io";
import chalk from "chalk";

export function websocketLogger(socket: Socket, next: (err?: Error) => void) {
    const timestamp = new Date().toISOString();
    const ip = socket.handshake.headers["x-forwarded-for"] || socket.handshake.address;
    const user = socket.data?.user || {};
    const userId = user?.id || "Anonymous";

    // Log connection
    console.log(
        chalk.green(`[${timestamp}] [WS CONNECT] User: ${userId} | IP: ${ip} | Socket ID: ${socket.id}`)
    );

    // Log disconnection
    socket.on("disconnect", (reason) => {
        const disconnectTime = new Date().toISOString();
        console.log(
            chalk.red(`[${disconnectTime}] [WS DISCONNECT] User: ${userId} | Reason: ${reason}`)
        );
    });

    // 🧠 Intercept all `socket.on()` calls
    const originalOn = socket.on.bind(socket);
    socket.on = (event: string, listener: (...args: any[]) => void) => {
        const wrappedListener = (...args: any[]) => {
            const eventTime = new Date().toISOString();
            const payload = args[0];

            console.log(
                chalk.blue(`[${eventTime}] [WS EVENT] User: ${userId} | Event: ${event} | Payload: ${JSON.stringify(payload)}`)
            );

            return listener(...args);
        };

        return originalOn(event, wrappedListener);
    };

    next();
}
