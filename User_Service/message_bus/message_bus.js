import amqplib from 'amqplib';
var channel;

export const rabbitConnect = async () => {
    try {
        // connect to RabbitMQ
        const connection = await amqplib.connect(`amqp://${process.env.RABBITMQ_URL}:5672`);
        channel = await connection.createChannel();
        await channel.assertQueue('bewebacademy');
        console.log('Connected to RabbitMQ');
    } catch (error) {
        console.log('Error connecting to RabbitMQ', error);
    }
}

export const sendToQueue = async (message, user) => {
    // send message to RabbitMQ on bewebacademy queue
    channel.sendToQueue('bewebacademy', Buffer.from(JSON.stringify({'message': message, 'data': user})));
}
