import { sum, ServerStorage} from "./ServerStorage"
let serverStorage: ServerStorage;
beforeAll(() => {
    serverStorage = new ServerStorage("subpage");
})
test('adds 1 + 2 to equal 4', async () => {
    expect(await sum(1, 2)).toBe(3);
});