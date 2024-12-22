import http2 from 'http2';

// Server address
const serverUrl = process.env.SERVER_URL || 'https://localhost:50051';

// Helper function to make HTTP/2 requests
async function makeRequest(path: string, method: string, body: any = {}) {
    try {
        return new Promise((resolve, reject) => {
            const client = http2.connect(serverUrl, {
                rejectUnauthorized: false, // For self-signed certificates; not for production
            });

            const req = client.request({
                ':path': path,
                ':method': method,
                'content-type': 'application/json',
            });

            let responseData = '';

            req.setEncoding('utf8');
            req.on('data', (chunk) => {
                responseData += chunk;
            });

            req.on('end', () => {
                client.close();
                try {
                    resolve(JSON.parse(responseData));
                } catch (err) {
                    reject(new Error(`Failed to parse response: ${responseData}`));
                }
            });

            req.on('error', (err) => {
                client.close();
                reject(new Error(`HTTP/2 request error: ${err.message}`));
            });

            if (method === 'POST') {
                req.write(JSON.stringify(body));
            }

            req.end();
        });
    } catch (error: any) {
        throw new Error(`Request to ${path} failed: ${error.message}`);
    }
}

// Individual Methods
async function connect() {
    return makeRequest('/connect', 'POST');
}

async function createCollection(body: any) {
    const parsedBody = ensureObject(body);
    return makeRequest('/collection/create', 'POST', parsedBody);
}

async function deleteCollection(body: any) {
    return makeRequest('/collection/delete', 'POST', body);
}

async function listCollections() {
    return makeRequest('/collections/list', 'POST');
}

async function createDocument(collectionName: string, data: any) {
    const parsedData = ensureObject(data);
    return makeRequest('/document/create', 'POST', { collectionName, data: parsedData });
}

async function deleteDocument(collectionName: string, query: any) {
    return makeRequest('/document/delete', 'POST', { collectionName, query });
}

async function findOneDocument(collectionName: string, query: any) {
    return makeRequest('/document/find-one', 'POST', { collectionName, query });
}

async function findAllDocuments(collectionName: string, query: any) {
    const parsedQuery = ensureObject(query);
    return makeRequest('/documents/find', 'POST', { collectionName, query: parsedQuery });
}

async function updateOneDocument(collectionName: string, query: any, updateData: any) {
    const parsedQuery = ensureObject(query);
    const parsedUpdateData = ensureObject(updateData);
    return makeRequest('/document/update-one', 'POST', {
        collectionName,
        query: parsedQuery,
        updateData: parsedUpdateData,
    });
}

// Helper to ensure object input
function ensureObject(input: any): any {
    return typeof input === 'string' ? JSON.parse(input) : input;
}

// Exported API
export default {
    connect,
    // Collection methods
    createCollection,
    listCollections,
    deleteCollection,

    // Document methods
    createOne: createDocument,
    deleteOne: deleteDocument,
    findOne: findOneDocument,
    findAll: findAllDocuments,
    updateOne: updateOneDocument,
};
