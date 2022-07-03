export async function sum(a:number, b:number): Promise<number>{
    return a + b;
}
export class ServerStorage{
    constructor(subPage: string){
        
    }
    async removeItem(arg0: string) {
        throw new Error("Method not implemented.");
    }
    async getItem(key: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async addItem(key: string, value: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async clear(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}