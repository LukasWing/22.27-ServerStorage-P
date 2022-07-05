const fetch: (url: RequestInfo, init?: RequestInit) => Promise<Response> = require("node-fetch");
interface IResource {
    page: string;
    key: string;
    value: string;
}

export async function sum(a:number, b:number): Promise<number>{
    return a + b;
}


export class ServerStorage{
    private subPage: string;
    private headers: Record<string, string>;
    constructor(subPage: string, authToken: string){
        this.subPage = subPage;
        this.headers = {
            "Content-Type": "application/json",
            "Authorization": authToken
        };
        console.log(this.headers);
    }
    async removeItem(arg0: string) {
        throw new Error("Method not implemented.");
    }
    async getItem(key: string): Promise<string> {
        let qs = `key=${key}&page=${this.subPage}`;
        let response = await fetch(`https://matquiz.dk/ServerStorage/storageAPI.php?${qs}`,{
            method: "GET",
            headers: this.headers,
        });
        let res: string = await response.text();
        let resource = JSON.parse(res) as IResource;
        return resource.value;
    }
    async addItem(key: string, value: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async clear(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}