const {kafka} = require('./client')

async function init() {
  const admin = kafka.admin();

  try {
    console.log("Admin connecting...");
    await admin.connect(); // need await here
    console.log("Admin connection successful");

    console.log("Creating topics...");
    const topicCreated = await admin.createTopics({
      topics: [
        {
          topic: "rider-updates", // avoid spaces in topic names
          numPartitions: 2,
        },
      ],
    });

    if (topicCreated) {
      console.log("Topic created successfully");
    } else {
      console.log("Topic already exists or was not created");
    }
  } catch (err) {
    console.error("Error in Kafka admin:", err);
  } finally {
    console.log("Disconnecting admin...");
    await admin.disconnect();
  }
}

init();
