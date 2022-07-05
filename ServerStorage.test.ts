import {ServerStorage} from "./ServerStorage";
let ss: ServerStorage;

beforeAll(() => {
    ss = new ServerStorage("ServerStorage","1234");
})

afterEach(async ()=>{
    await ss.clear(); // caution
})

test('getHttpTest1 expect value inserted', async () => {
    await ss.addItem("tester1",'tester1Val');
    expect(await ss.getItem("tester1")).toEqual("tester1Val");
})

test('error on get testNUM', async () => {
    expect.assertions(1);
    return ss.getItem("testNUM")
        .catch((e:Error) => 
            expect(e.message).toMatch("No such key found")
        );
})

test('add hey as testStr get hey back',async () => {
    await ss.addItem("testStr",'hey');
    expect(await ss.getItem("testStr")).toEqual('hey');
})

test('removeItem removes testNum', async () => {
    expect.assertions(1);
    await ss.addItem("testNum",'5');
    await ss.removeItem("testNum");
    await ss.getItem("testNum")
        .catch((e:Error) => 
            expect(e.message).toMatch("No such key found")
        );
})

test('clear removes allItems', async () => {
    expect.assertions(2);
    await ss.addItem("testNum",'5');
    await ss.addItem("testStr",'John');
    await ss.clear();
    await ss.getItem("testNum")
        .catch((e:Error) => 
            expect(e.message).toMatch("No such key found")
        );
    await ss.getItem("testStr")
        .catch((e:Error) => 
            expect(e.message).toMatch("No such key found")
    );   
})


