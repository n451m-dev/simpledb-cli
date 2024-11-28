import { Command } from "commander";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

// Load the updated proto file
const PROTO_PATH = path.join(__dirname, "../proto/database.proto");
console.log("PROTO_PATH", PROTO_PATH);

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition) as any;

// Access the DatabaseService from the proto definition
const DatabaseService = proto.database.DatabaseService;

export function connectCommand(program: Command) {
    program
        .command("connect")
        .description("Connect to the database")
        .action(() => {
            const client = new DatabaseService(
                "localhost:50051",
                grpc.credentials.createInsecure()
            );

            // Call the Connect method
            client.Connect({}, (error: any, response: any) => {
                if (error) {
                    console.error("Failed to connect to the database:", error);
                } else {
                    console.log("Connected to the database:", response.message);
                }
            });
        });
}
