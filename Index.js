const { spawn } = require("child_process");

const start = () => {
  const child = spawn("node", ["main.js", ...process.argv.slice(2)], {
    stdio: ["inherit", "inherit", "inherit", "ipc"],
  })
    .on("message", (msg) => {
      if (msg === "restart") {
        child.kill();
        start();
        delete child;
      } else {
        child.kill();
      }
    })
    .on("exit", (code) => {
      if (!(code == null)) {
        child.kill();
        start();
        delete child;
      }
    })
    .on("error", (err) => console.log(err));
};

start();
