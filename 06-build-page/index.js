const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');
const stylesDir = path.join(__dirname, 'styles');
const assetsDir = path.join(__dirname, 'assets');
const distDir = path.join(__dirname, 'project-dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

const templatePath = path.join(__dirname, 'template.html');
const template = fs.readFileSync(templatePath, 'utf-8');

const componentNames = template.match(/{{\s*(\S+)\s*}}/g).map(tag => tag.slice(2, -2));

const components = {};
for (const componentName of componentNames) {
  const componentPath = path.join(componentsDir, `${componentName}.html`);
  components[componentName] = fs.readFileSync(componentPath, 'utf-8');
}

let result = template;
for (const [componentName, componentContent] of Object.entries(components)) {
  const tag = `{{${componentName}}}`;
  result = result.replace(new RegExp(tag, 'g'), componentContent);
}

const indexPath = path.join(distDir, 'index.html');
fs.writeFileSync(indexPath, result);

const styles = [];
const styleFiles = fs.readdirSync(stylesDir);
for (const fileName of styleFiles) {
  const filePath = path.join(stylesDir, fileName);
  const ext = path.extname(filePath);
  if (ext === '.css') {
    const content = fs.readFileSync(filePath, 'utf-8');
    styles.push(content);
  }
}

const stylesPath = path.join(distDir, 'style.css');
fs.writeFileSync(stylesPath, styles.join('\n'));

const assetsDest = path.join(distDir, 'assets');
if (!fs.existsSync(assetsDest)) {
  fs.mkdirSync(assetsDest);
}

const assetsFiles = fs.readdirSync(assetsDir);
for (const fileName of assetsFiles) {
  const srcPath = path.join(assetsDir, fileName);
  const destPath = path.join(assetsDest, fileName);
  const stat = fs.statSync(srcPath);
  if (stat.isFile()) {
    const content = fs.readFileSync(srcPath);
    fs.writeFileSync(destPath, content);
  }
}