const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length
//Routers
const routerCart = require( './routes/cartRoutes');
const routerProducts = require( './routes/productRoutes');
const router = require( './routes/userRoutes');
//logger
const logger = require('./config/logger');

dotenv.config();

const app = express();

//CLUSTER

const clusterMode = process.argv[3] === "CLUSTER";

    if(clusterMode && cluster.isMaster) {
        console.log(`Master ${process.pid} is running`);
        console.log(`there's ${ numCPUs } CPU's `);

        for(let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
            // una vez que murió, genera otro cluster inmediatamente
            cluster.fork();
        });

    } else {
        //FORK
        const PORT  = process.env.PORT || parseInt(process.argv[2]) || 8080;

        app.listen(PORT, err => {
            if (!err) {
                console.log(`Server express (fork) port ${PORT} - PID WORKER ${process.pid}`);
            }
        });
    }


        
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/products', routerProducts);
app.use('/api/cart', routerCart);
app.use('/api/users', router);

app.use('/api/info', (req, res) => {
    res.send({
        node_Ver:process.version,
        process_PID: process.pid,
        plataforma: process.platform,
        folder: process.cwd(),
        memoria: Number(process.memoryUsage().heapTotal*1e-6) +' MB', 
        num_CPUs: numCPUs,
    });
});

app.get('*', (req, res) => {
    const { url, method } = req;
    logger.warn(`Ruta no implementada: ${url} - ${method}`);
    res.status(404).send({error: 'Ruta '+url+' no implementada'});
});

// pm2 start index.js --name="server-fork" --watch -- 8081
// pm2 start index.js --name="server-cluster" --watch i- max -- 8082
