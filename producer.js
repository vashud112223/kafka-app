const { kafka } = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
async function init() {
  const producer = kafka.producer();
  try {
    console.log("Producer connecting...");
    await producer.connect(); // need await here
    console.log("Producer connection successful");

    rl.setPrompt(">");
    rl.prompt();

    rl.on("line", async function (line) {
      const [ridername, location] = line.split(" ");
      await producer.send({
        topic: "rider-updates",
        messages: [
          {
            partition: location.toLowerCase() === "north" ? 0 : 1,
            key: "location-update",
            value: JSON.stringify({ name: ridername, location: location }),
          },
        ],
      });
    }).on("close", async () => {
      await producer.disconnect();
    });
  } catch (err) {
    console.log(err);
  }
}
init();
