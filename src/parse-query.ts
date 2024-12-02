export function parseQuery(query: string) {
    try {
         
    // Trim the query and remove any trailing semicolon if present
    query = query.trim().replace(/;$/, '');

    const regex = /^([\w]+)\.([\w]+)\((.*)\)$/;

    // Match the query with the expected pattern
    const match = query.match(regex);

    if (!match) {
        throw new Error('Invalid query format. Expected format: collection.method({...}) or collection.method().');
    }

    const [, collection, method, args] = match;
    

    // Validate collection and method
    if (!collection || !method || !/^[a-zA-Z_][\w]*$/.test(collection) || !/^[a-zA-Z_][\w]*$/.test(method)) {
        throw new Error('Invalid collection or method name. Must be a valid string and not a number.');
    }

    // Validate parentheses
    if (args === undefined) {
        throw new Error('Method must include parentheses, even if empty: e.g., collection.method().');
    }

    // Validate curly braces in args (if not empty)
    if (args.trim()) {
        let openBraces = 0;
        for (const char of args.trim()) {
            if (char === '{') openBraces++;
            if (char === '}') openBraces--;
            if (openBraces < 0) {
                throw new Error('Unmatched closing brace in arguments.');
            }
        }

        if (openBraces !== 0) {
            throw new Error('Unmatched opening brace in arguments.');
        }
    }

    // Return the parsed result
    return {
        collection,
        method,
        args: args.trim() || {}, // Return an empty object if no arguments provided
    };
    } catch (err) {
        throw err
    }
}
