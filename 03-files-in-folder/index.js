const fs = require('fs');
const path = require('path');

const secretPath = path.join(__dirname, 'secret-folder');

fs.readdir(secretPath, { withFileTypes: true }, (err, files) => {

    if(err) {
        console.log(err);
        return;
    }

    files.forEach(file => {
        if (file.isFile()) {

            const filePath = path.join(secretPath, file.name);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.log(err);
                    return;
                }

                const fileSize = stats.size / 1024;
                const extension = path.extname(file.name).substring(1);12
                const fileName = path.basename(file.name, path.extname(file.name));

                console.log(`${fileName} - ${extension} - ${fileSize.toFixed(3)} kb`);
            });
        }
    });
});