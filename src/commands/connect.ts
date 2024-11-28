import { Command } from 'commander';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from "path";

// Load proto file
const PROTO_PATH = path.join(__dirname, "../../proto", "database.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition) as any; // Cast to any to avoid type issues

// Ensure you're accessing the correct service definition
const DatabaseService = proto.database.DatabaseService;

export function connectCommand(program: Command) {
    program
        .command('connect')
        .description('Connect to the database')
        .action(() => {
            const client = new DatabaseService('localhost:50051', grpc.credentials.createInsecure());

            client.Connect({}, (error: any, response: any) => {
                if (error) {
                    console.error('Failed to connect to the database:', error);
                } else {
                    console.log('Connected to the database:', response.message);
                }
            });
        });
}
