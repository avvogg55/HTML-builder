const fs = require('fs/promises');
const path = require('path');

async function copyDir() {
    const srcPath = path.join(__dirname, 'files');
    const destPath = path.join(__dirname, 'files-copy');

    try {
        await fs.mkdir(destPath, { recursive: true });
    } catch (err) {
        console.error(err);
        return;
    }

    try {
        const files = await fs.readdir(srcPath);

        for (const file of files) {
            const srcFilePath = path.join(srcPath, file);
            const destFilePath = path.join(destPath, file);

            const stats = await fs.stat(srcFilePath);

            if (stats.isDirectory()) {
                await copyDir(srcFilePath, destFilePath);
            } else {
                await fs.copyFile(srcFilePath, destFilePath);
            }
        }

        console.log('Directory copied');
    } catch (err) {
        console.error(err);
    }
}

copyDir();