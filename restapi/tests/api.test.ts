import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import user from "../routes/user";
import product from '../routes/product';
import mongoose from 'mongoose';

let app:Application;
let server:http.Server;

const mongodb = 'mongodb+srv://test:test@test.tgpeg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
let token = '';

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
    app.use(product);

    server = app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });
});

afterAll(async () => {
    await mongoose.connection.collections['users'].drop();
    await mongoose.connection.collections['products'].drop();
    await mongoose.connection.close();
    server.close() //close the server
});

//------------------------------USERS------------------------------

describe('user ', () => {
    /**
     * Tests that a user can be created.
     */
    it('can be created correctly', async () => {
        const user = {
            username: 'Pablo1',
            email: 'pablo1@email.com',
            password: 'Pabloalonso1?',
            confirmPassword: 'Pabloalonso1?',
            dni: '12345678A'
        }
        const response: Response = await request(app).post('/signup').send(user).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    });
    
    /**
     * Tests that a user can't be duplicated.
     */
    it('can\'t be created correctly', async () => {
        const user = {
            username: 'Pablo1',
            email: 'pablo1@email.com',
            password: 'Pabloalonso1?',
            confirmPassword: 'Pabloalonso1?',
            dni: '12345678A'
        }
        const response: Response = await request(app).post('/signup').send(user).set('Accept', 'application/json');
        expect(response.statusCode).toBe(400);
    });

    /**
     * Tests that a user can login.
     */
     it('can login correctly', async () => {
        const user = {
            username: 'Pablo1',
            password: 'Pabloalonso1?'
        }
        const response: Response = await request(app).post('/login').send(user).set('Accept', 'application/json');
        
        token = response.header['authorization'];

        expect(response.statusCode).toBe(200);
    });

    /**
     * Tests that can find all the users
     */
    it('can find all the users',async () => {
        const user = {
            username: 'Pablo2',
            email: 'pablo2@email.com',
            password: 'Pabloalonso2?',
            confirmPassword: 'Pabloalonso2?',
            dni: '12345678B'
        }
        await request(app).post('/signup').send(user).set('Accept', 'application/json');
        const users = await (await request(app).get('/user/list').set('Authorization', token).set('Accept', 'application/json')).body.users;

        expect(users.length).toBe(2);
    });

    /**
     * Tests find user by username.
     */
     it('can find user by username', async () => {
        const username = 'Pablo1';
        
        const user = await (await request(app).get(`/user/${username}`).set('Authorization', token).set('Accept', 'application/json')).body.user[0];

        expect(user.username).toBe(username);
    });

    /**
     * Tests delete user by username.
     */
     it('can delete user by username', async () => {
        const username = 'Pablo2';

        (await request(app).get(`/user/delete/${username}`).set('Authorization', token).set('Accept', 'application/json'));

        const users = await (await request(app).get('/user/list').set('Authorization', token).set('Accept', 'application/json')).body.users;

        expect(users.length).toBe(1);
    });

    /**
     * Tests update user by id.
     */
     it('can update user', async () => {
        const user = {
            username: 'Pablo1',
            email: 'pablo123@email.com'
        }

        const userid = await (await request(app).get(`/user/${user.username}`).set('Authorization', token).set('Accept', 'application/json')).body.user[0];
        
        (await request(app).post(`/user/update/${userid._id}`).set('Authorization', token).send(user).set('Accept', 'application/json'));

        const updatedUser = await (await request(app).get(`/user/${user.username}`).set('Authorization', token).set('Accept', 'application/json')).body.user[0];

        expect(user!.email).toBe(updatedUser!.email);
    });

});

//------------------------------PRODUCTS------------------------------
describe('products ', () => {
    /**
     * Tests that a user can be created.
     */
    it('can be created correctly', async () => {
        const product = {
            name: "Laptop",
            description: "Simple laptop",
            basePrice: 1345,
            IVA: 0.21,
            units: 4,
            categories: ["Electronic", "Laptop"],
            urlImage: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4LqQX?ver=1f00"
        }
        const response:Response = await request(app).post('/product/add').send(product).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    });
});