class JsonRPC {
    constructor(endpoint) {
        this.lastId = 0;
        this.endpoint = endpoint;
        this.headers = {
            accept: 'application/json',
            'content-type': 'application/json',
        };
    }

    request = (method, params = null) => {
        const id = this.lastId ++;

        const req = {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                jsonrpc: '2.0',
                id,
                method,
                params,
            }),
        };

        return fetch(this.endpoint, req);
    }
}

export default JsonRPC;
