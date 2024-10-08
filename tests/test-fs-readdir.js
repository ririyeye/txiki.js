import assert from 'tjs:assert';

const dirs = [ 'advanced', 'fixtures', 'helpers', 'wasi', 'wasm' ];

const dirIter = await tjs.readDir(import.meta.dirname);

for await (const item of dirIter) {
    const { name } = item;
    if (name in dirs) {
        assert.ok(item.isDir);
        assert.notOk(item.isFIFO);
    } else if (name.startsWith('test-') && name.endsWith('.js')) {
        assert.ok(item.isFile);
        assert.notOk(item.isSocket);
    }
}

await dirIter.close();
