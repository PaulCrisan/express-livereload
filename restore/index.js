const fs = require("fs");

const path = require("path");

const basePath = path.resolve("./");
const pathToHistory = path.join(basePath, "history");

const js = path.join(basePath, "public/javascripts/main.js");
const css = path.join(basePath, "public/stylesheets/style.scss");
const html = path.join(basePath, "public/index.html");

function checkFiles(...args) {
  return Promise.all(
    args.map(
      (file) =>
        new Promise((res, rej) => {
          fs.access(file, fs.F_OK, (err) => {
            if (err) {
              res(null);
            } else {
              res(file);
            }
          });
        })
    )
  );
}

const createHistory = () => {
  const timeDir = new Date().toUTCString().split(/,| +/).join("_");

  checkFiles(js, css, html).then((res) => {
    fs.mkdir(path.join(pathToHistory, timeDir), (err) => {
      if (err) {
        return console.error(err);
      }

      res.map((el) => {
        const fileType = el.split("/").slice(-1).pop();
        fs.copyFile(
          el,
          path.join(pathToHistory, timeDir, el.split("/").slice(-1).pop()),
          function (err) {
            if (err) {
              throw err;
            } else {
              console.log("Successfully copied and moved the file!");
              if (fileType.split(".")[1] === "html") {
                fs.writeFile(el, html5, (err) => {
                  if (err) console.log(err);
                  console.log("Html restored");
                });
              } else {
                fs.writeFile(el, "", () => console.log("Files erased"));
              }
            }
          }
        );
      });
    });
  });
};

createHistory();

var html5 = `<html>
<head>
  <title>Express</title>
  <link rel="stylesheet" href="/stylesheets/style.css" />
</head>

<body>
  <div>
    <!-- new content -->
  </div>
  <script src="/javascripts/main.js"></script>
</body>
</html>`;
