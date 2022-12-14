import amqplib from 'amqplib';
import { createUser, updateUser } from '../controllers/user_contoller.js';
var channel;

export const rabbitConnect = async () => {
    try {
        // connect to RabbitMQ
        const connection = await amqplib.connect(`amqp://${process.env.RABBITMQ_URL}:5672`);
        channel = await connection.createChannel();
        await channel.assertQueue('archive2_queue');
        console.log('Connected to RabbitMQ');
        // consume bewebacademy queue
        channel.consume("archive2_queue", async (data) => {
            await checkEvent(JSON.parse(Buffer.from(data.content)).message, JSON.parse(Buffer.from(data.content)).data).then(console.log('Event checked'));
            channel.ack(data);
        }
        );
    } catch (error) {
        console.log('Error connecting to RabbitMQ', error);
    }
}

const checkEvent = async (event, data) => {
    if (event === 'user_deleted') {
        await createUser(data);
    }else if (event === 'user_updated') {
        await updateUser(data);
    }else if (event === 'user_created') {
        await createUser(data);
    }
}