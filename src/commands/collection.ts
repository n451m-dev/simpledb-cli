import { Command } from 'commander';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from "path";
// Load proto file
const PROTO_PATH = path.join(__dirname, "../proto/database.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition) as any; // Cast to any to avoid type issues

// Ensure you're accessing the correct service definition
const DatabaseService = proto.database.DatabaseService;

export function createCollectionCommand(program: Command) {
    program
        .command('createCollection <name>')
        .description('Create a new collection')
        .action((name: string) => {
            const client = new DatabaseService('localhost:50051', grpc.credentials.createInsecure());

            const request = { collection_name: name };
            client.CreateCollection(request, (error: any, response: any) => {
                if (error) {
                    console.error('Error creating collection:', error);
                } else {
                    console.log('Collection created:', response.message);
                }
            });
        });
}

export function findCollectionCommand(program: Command) {
    program
        .command('findCollection <name>')
        .description('Find a collection')
        .action((name: string) => {
            const client = new DatabaseService('localhost:50051', grpc.credentials.createInsecure());

            const request = { collection_name: name };
            client.FindCollection(request, (error: any, response: any) => {
                if (error) {
                    console.error('Error finding collection:', error);
                } else {
                    console.log('Collection data:', response.data);
                }
            });
        });
}

export function deleteCollectionCommand(program: Command) {
    program
        .command('deleteCollection <name>')
        .description('Delete a collection')
        .action((name: string) => {
            const client = new DatabaseService('localhost:50051', grpc.credentials.createInsecure());

            const request = { collection_name: name };
            client.DeleteCollection(request, (error: any, response: any) => {
                if (error) {
                    console.error('Error deleting collection:', error);
                } else {
                    console.log('Collection deleted:', response.message);
                }
            });
        });
}
