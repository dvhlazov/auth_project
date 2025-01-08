import express, { Router } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/routes.js';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';

const server = express();

server.use(
    session({
        secret: 'abcd',
        resave: false,
        saveUninitialized: false,
        cookie: {secure: false}, // for http
    })
)
server.use(passport.initialize());
server.use(passport.session());
server.use(cookieParser());



//Middlewares
server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

server.get('/', (req, res) =>  {
    res.send('<h4>Server is started successfully</h4><style>h4 { text-align: center; display: flex; justify-content: center; align-items: center; height: 100vh; }</style>');

})
server.use('/api', routes)
    
//404 for not found Pages
/* server.use((req, res, next) => {
    res.status(404).send('<h1>404</h1><h3>Page not Found</h3><style>h1,h3 { text-align: center; display: flex; justify-content: center; align-items: center; padding-top: 100px; }</style>');
}) */
export default server;