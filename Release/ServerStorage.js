/**
 * class mimicking localStorage functionality and essentially exposes a keyValueStore.
 */
export class ServerStorage {
    subPage;
    headers;
    apiRoot = "https://matquiz.dk/ServerStorage/storageAPI.php";
    /**
     * @param subPage an identifier for your page.
     * @param authToken the authentication token that is needed to get access to keyv value store.
     * Ask Lukas for this.
     */
    constructor(subPage, authToken) {
        this.subPage = subPage;
        this.headers = {
            "Content-Type": "application/json",
            "Authorization": authToken
        };
    }
    /**
     * Removes an item corresponding to page.
     * @param key of item to be removed
     */
    async removeItem(key) {
        const body = {
            page: this.subPage,
            key: key
        };
        let response = await fetch(this.apiRoot, {
            method: "DELETE",
            headers: this.headers,
            body: JSON.stringify(body)
        });
        if (response.status === 204)
            return;
        else if (response.status === 404)
            console.log("No key to be deleted matched " + key);
        else
            throw new Error("Unknown error: " + response.status);
    }
    /**
     * Retrives item
     * @param key key of value to be retrieved
     * @returns value
     * @throws No such key found.
     */
    async getItem(key) {
        let qs = `key=${key}&page=${this.subPage}`;
        let response = await fetch(`${this.apiRoot}?${qs}`, {
            method: "GET",
            headers: this.headers,
        });
        let res = await response.text();
        const errorResponse = res === "Error getting value" || response.status === 404;
        if (errorResponse) {
            throw new Error("No such key found");
        }
        let resource = JSON.parse(res);
        return resource.value;
    }
    /**
     * Adds item to key value store with given page.
     * @param key
     * @param value
     */
    async addItem(key, value) {
        let body = {
            page: this.subPage,
            key: key,
            value: value
        };
        let response = await fetch(this.apiRoot, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error("Uknown error on upload: " + response.status);
        }
    }
    /**
     * Clears entire key value store on this page
     */
    async clear() {
        let response = await fetch(this.apiRoot, {
            method: "DELETE",
            headers: this.headers,
            body: JSON.stringify({ page: this.subPage })
        });
        if (response.status === 204)
            return;
        else
            throw new Error("Unknown error: " + response.status);
    }
}
