const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');
const stylesDir = path.join(__dirname, 'styles');
const assetsDir = path.join(__dirname, 'assets');
const distDir = path.join(__dirname, 'project-dist');

if (!fs.exists(distDir)) {
  fs.mkdir(distDir);
}

const templatePath = path.join(__dirname, 'template.html');
const template = fs.readFile(templatePath, 'utf-8');

const componentNames = template.match(/{{\s*(\S+)\s*}}/g).map(tag => tag.slice(2, -2));

const components = {};
for (const componentName of componentNames) {
  const componentPath = path.join(componentsDir, `${componentName}.html`);
  components[componentName] = fs.readFile(componentPath, 'utf-8');
}

let result = template;
for (const [componentName, componentContent] of Object.entries(components)) {
  const tag = `{{${componentName}}}`;
  result = result.replace(new RegExp(tag, 'g'), componentContent);
}

const indexPath = path.join(distDir, 'index.html');
fs.writeFile(indexPath, result);

const styles = [];
const styleFiles = fs.readdir(stylesDir);
for (const fileName of styleFiles) {
  const filePath = path.join(stylesDir, fileName);
  const ext = path.extname(filePath);
  if (ext === '.css') {
    const content = fs.readFile(filePath, 'utf-8');
    styles.push(content);
  }
}

const stylesPath = path.join(distDir, 'style.css');
fs.writeFile(stylesPath, styles.join('\n'));

const assetsDest = path.join(distDir, 'assets');
if (!fs.exists(assetsDest)) {
  fs.mkdir(assetsDest);
}

const assetsFiles = fs.readdir(assetsDir);
for (const fileName of assetsFiles) {
  const srcPath = path.join(assetsDir, fileName);
  const destPath = path.join(assetsDest, fileName);
  const stat = fs.stat(srcPath);
  if (stat.isFile()) {
    const content = fs.readFile(srcPath);
    fs.writeFile(destPath, content);
  }
}