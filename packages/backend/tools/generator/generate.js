
const {generateTemplateFiles} = require('generate-template-files');
const path = require('path');


console.log(process.cwd());
console.log(__dirname);
console.log(path.join("./"));
generateTemplateFiles([
  {
    option: 'Generate Use Case',
    entry: {
      folderPath: path.join(process.cwd(), '/tools/generator/templates/usecase/'),
    },
    stringReplacers: [
      {
        slot: "__usecase__",
        question: "Insert your usecase name"
      },
      {
        slot: "__module__",
        question: "Insert your modules name"
      }
    ],
    output: {
      path: './src/modules/__module__(kebabCase)/usecase/__usecase__(kebabCase)',
    },
    onComplete: (results) => {
      console.log(`results`, results);
    },
  },
]);