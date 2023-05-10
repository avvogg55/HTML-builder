const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const distDir = path.join(__dirname, 'project-dist');
const bundleFile = 'bundle.css';

const stylesFiles = fs.readdir(stylesDir);

const cssFiles = stylesFiles.filter((fileName) => path.extname(fileName) === '.css');

const stylesData = cssFiles.map((cssFile) => {
  const cssFilePath = path.join(stylesDir, cssFile);
  return fs.readFile(cssFilePath, 'utf8');
});

fs.writeFile(path.join(distDir, bundleFile), stylesData.join('\n'), 'utf8');