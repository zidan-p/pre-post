
const {generateTemplateFiles} = require('generate-template-files');
const path = require('path');


console.log(process.cwd());
console.log(__dirname);
console.log(path.join("./"));
generateTemplateFiles([
  {
    option: 'Generate new Module',
    entry: {
      folderPath: path.join(process.cwd(), '/tools/generator/templates/module/'),
    },
    stringReplacers: [
      {
        slot: "__module__",
        question: "Insert your new modules name"
      }
    ],
    output: {
      path: './src/modules/__module__(kebabCase)',
    },
    onComplete: (results) => {
      console.log(`results`, results);
    },
  },
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
  {
    option: 'Generate Resource usecase',
    entry: {
      folderPath: path.join(process.cwd(), '/tools/generator/templates/resource-usecase/'),
    },
    stringReplacers: [
      {
        slot: "__module__",
        question: "Insert your modules name"
      },
      {
        slot: "__domain__",
        question: "Insert your target domain here"
      }
    ],
    output: {
      path: './src/modules/__module__(kebabCase)/usecase/',
    },
    onComplete: (results) => {
      console.log(`results`, results);
    },
  },
]);