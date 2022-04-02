import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import user from "../routes/user";
import mongoose from 'mongoose';

let app:Application;
let server:http.Server;

const mongodb = 'mongodb+srv://test:test@test.tgpeg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

beforeAll(async () => {
    app = express();
    const port: number = 5000;
    const options: cors.CorsOptions = {
        origin: ['http://localhost:3000']
    };

    await mongoose.connect(mongodb);

    app.use(cors(options));
    app.use(bp.json());
    app.use(user);

    server = app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
    server.close() //close the server
});

describe('user ', () => {
    /**
     * Tests that a user can be created through the productService without throwing any errors.
     */
    it('can be created correctly', async () => {
        const user = {
            username: 'Pablo12',
            email: 'pablo12@email.com',
            password: 'Pabloalonso1?',
            confirmPassword: 'Pabloalonso1?',
            dni: '12345678A'
        }
        const response:Response = await request(app).post('/signup').send(user).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });
});