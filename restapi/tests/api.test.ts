import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import api from '../api';
import mongoose from 'mongoose';
require('dotenv').config()

let app:Application;
let server:http.Server;

beforeAll(async () => {
    app = express();
    const port: number = 5000;
    const options: cors.CorsOptions = {
        origin: ['http://localhost:3000']
    };
    app.use(cors(options));
    app.use(bp.json());
    app.use("/api", api)

    await mongoose.connect('');

    server = app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
    server.close() //close the server
})

describe('user ', () => {
    /**
     * Tests that a user can be created through the productService without throwing any errors.
     */
    it('can be created correctly', async () => {
        const user = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            dni: ''
        }
        const response:Response = await request(app).post('/api/signup').send(user).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });
});