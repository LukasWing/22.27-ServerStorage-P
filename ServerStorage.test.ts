import { sum, ServerStorage} from "./ServerStorage";
let ss: ServerStorage;

beforeAll(() => {
    ss = new ServerStorage("ServerStorage","1234");
})
// afterEach(async ()=>{
//     await ss.clear(); // caution
// })

test('getHttpTest1 expect value inserted by testAPI', async () => {
    expect(await ss.getItem("httpTest1")).toEqual("2");
})

test('adds 1 + 2 to equal 3', async () => {
    expect(await sum(1, 2)).toBe(3);
});

test('add hey as testStr get hey back',async () => {
    await ss.addItem("testStr",'hey');
    expect(await ss.getItem("testStr")).toEqual('hey');
})

test('add 5 as testNum get error on get testNUM', async () => {
    await ss.addItem("testNum",'5');
    expect(await ss.getItem("testNUM")).toThrowError("No such key found");
})

test('removeItem removes testNum', async () => {
    await ss.addItem("testNum",'5');
    await ss.removeItem("testNum");   
    expect(await ss.getItem("testNum")).toThrowError("No such key found");
})

test('clear removes allItems', async () => {
    await ss.addItem("testNum",'5');
    await ss.addItem("testStr",'John');
    await ss.clear();   
    expect(await ss.getItem("testNum")).toThrowError("No such key found");
    expect(await ss.getItem("testStr")).toThrowError("No such key found");
})




