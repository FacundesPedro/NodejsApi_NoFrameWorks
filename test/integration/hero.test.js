import { it, run, test } from "node:test";
import assert from "node:assert";
import { promisify } from "node:util";

test('Hero integration test suite',async (t) => {
    const testPort = 8090;
    const testServerUri = `http://localhost:${testPort}/heroes`;
    // Don't ever mutate env var like so,
    process.env.PORT = testPort;

    const { server } = await import('../../src/index.js');

    await t.test('it should create a hero',async (t) => {
        const data = {
            "name": "Batman",
            "power":"Trauma",
            "strengh":"2",
            "smart":"8"
        };

        const response = await fetch(testServerUri, {
            method:'POST',
            body:JSON.stringify(data),
        });

        assert.deepStrictEqual(
            response.headers.get('content-type'),
            'application/json'
        )

        // STATUS "CREATED";
        assert.strictEqual(response.status,201);

        const responseJson = await response.json();
        // console.log('Ok:',responseJson.ok)

        assert.deepStrictEqual(responseJson.ok,
            'User Created with Sucess',
            'it should return a valid ok message'
            );
        
        assert.ok(
            responseJson.id.length > 15,
            'it should return a valid bigger than 0 id'
        )

    });

    await promisify(server.close.bind(server))();
});
