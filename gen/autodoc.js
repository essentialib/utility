const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, '../src/functions');

class Typemark {
  constructor(type, name, description) {
    this.type = type;
    this.name = name;
    this.description = description;
  }
}
class Comment {
  constructor() {
    this.name = '';
    this.description = '';
    this.category = '';
    this.params = [];
    this.returns = null;
    this.aliases = [];
    this.examples = '';
  }
}


const dirs = fs.readdirSync(dirPath);
let comments = {};

for (let dir of dirs) {
  comments[dir] = [];
  const files = fs.readdirSync(path.join(dirPath, dir));

  for (let file of files) {
    const data = fs.readFileSync(path.join(dirPath, dir, file), 'utf8');

    let comment = new Comment();
    comment.name = file.toString().split('.')[0];
    comment.category = dir;

    const sentences = data.match(/^ \* (.*)/gm).map(s => s.substring(3));
    sentences.forEach((s, i) => {
      if (i == 0) {
        comment.description = s;
      } else {
        const key = s.split(' ')[0];
        const value = s.split(' ').slice(1).join(' ');

        switch (key) {
          case '@this':
            m = value.match(/{(?<type>.*?)} (?<desc>.*)/);
            if (m == null) break;
            comment.params.push(new Typemark(m.groups.type, 'this', m.groups.desc));
            break;
          case '@param':
            m = value.match(/{(?<type>.*?)} (?<name>\w+|\[.*?\]) (?<desc>.*)/);
            if (m == null) break;
            comment.params.push(new Typemark(m.groups.type, m.groups.name, m.groups.desc));
            break;
          case '@returns':
            m = value.match(/{(?<type>.*?)} (?<desc>.*)/);
            if (m == null) break;
            comment.returns = new Typemark(m.groups.type, 'returns', m.groups.desc);
            break;
          case '@alias':
            comment.aliases = value.split(/, */);
            break;
          case '@example':
            break;
          default:
            comment.examples += (s + '\n');
        }
      }
    });

    comments[dir].push(comment);
  }
}

const template = 
`
# {title}
\`\`\`js
{form}
\`\`\`
{description}

**Parameters**
| name | type | description |
|------|------|-------------|
{params}

**Returns**  
| type | description |
|------|-------------|
{returns}

**Examples**
\`\`\`js
{examples}
\`\`\`
`

for (let dir in comments) {
  let markdown = '';
  for (let comment of comments[dir]) {
    const form = (comment.params[0].name == 'this') ?
                  `_(${comment.params[0].name}).${comment.name}(${comment.params.map(p => p.name).slice(1).join(', ')})` :
                  `${comment.name}(${comment.params.map(p => p.name).join(', ')})`;
    const description = comment.description + (comment.aliases.length > 0 ? '\n\n**Aliases**\n' + comment.aliases.map(a => `- \`${a}\``).join('\n') : '');
    const params = comment.params.map(p => `| ${p.name} | \`${p.type}\` | ${p.description} |`).join('\n');
    const returns = comment.returns == null ? '' : `| \`${comment.returns.type}\` | ${comment.returns.description} |`;
    const examples = comment.examples.slice(0, -1);

    markdown += template
      .replace('{title}', comment.name)
      .replace('{form}', form)
      .replace('{description}', description)
      .replace('{params}', params)
      .replace('{returns}', returns)
      .replace('{examples}', examples);
  }
  fs.writeFileSync(path.join(__dirname, '../docs', dir + '.md'), markdown);
}