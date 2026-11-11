const { test } = require('@playwright/test');

test.describe.configure({
    mode: 'parallel'
});

test('Parallel Demo 2  Test 1', async () => {

    console.log('Demo 2 Test 1 START');

    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('Demo 2 Test 1 END');
});

test('Parallel Demo 2  Test 2', async () => {

    console.log('Demo 2 Test 2 START');

    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('Demo 2 Test 2 END');
});

test('Parallel Demo 2  Test 3', async () => {

    console.log('Demo 2 Test 3 START');

    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('Demo 2 Test 3 END');
});