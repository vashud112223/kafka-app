const { Kafka } = require('kafkajs');

exports.kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'], // connect to your local Kafka broker
});

// Start Kafka + Zookeeper
// docker-compose up -d

// Verify Kafka is running
// docker ps
