import amqplib from 'amqplib';
var channel;
var queueTab = ["archive_queue", "archive2_queue"];

export const rabbitConnect = async () => {
    try {
        // connect to RabbitMQ
        const connection = await amqplib.connect(`amqp://${process.env.RABBITMQ_URL}:5672`);
        channel = await connection.createChannel();
        // assert all queues
        queueTab.forEach(async (queue) => {
            await channel.assertQueue(queue);
        });
        console.log('Connected to RabbitMQ');
    } catch (error) {
        console.log('Error connecting to RabbitMQ', error);
    }
}

export const sendToQueue = async (message, user) => {
    console.log('Sending to queue');
    // send message to RabbitMQ on bewebacademy queue
    try
    {
        queueTab.forEach(async (element) =>{
            console.log(`Publishing to queueName: ${element.toString()}`);
            await channel.sendToQueue(element, Buffer.from(JSON.stringify({'message': message, 'data': user})));
        });  
    }
    catch(error)
    {
        console.log('Error sending to queue', error);
    }
}
