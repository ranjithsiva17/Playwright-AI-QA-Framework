const { test, expect } = require('@playwright/test');

test('Flaky handling - proper synchronization', async ({ page }) => {

    await page.setContent(`
        <div id="status">Loading...</div>

        <script>
            setTimeout(() => {
                document.getElementById('status').textContent = 'Ready';
            }, 9000);
        </script>
    `);

    await expect(
        page.locator('#status')
    ).toHaveText('Ready');

    console.log('Status became Ready');
});