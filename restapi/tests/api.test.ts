import request, { Response } from 'supertest';
import express, { Application, response } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import user from "../routes/user";
import product from '../routes/product';
import mongoose from 'mongoose';
import { IUser } from '../models/user';

let app: Application;
let server: http.Server;
const admin = {
    username: 'admin',
        email: 'admin@admin.com',
        password: process.env.PASS,
        confirmPassword: process.env.PASS,
        dni: '12345675A',
        rol: 1,
        status: true
}

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

    server = app.listen(port, (): void => {
        console.log('Restapi server for testing listening on ' + port);
    }).on("error", (error: Error) => {
        console.error('Error occured: ' + error.message);
    });

    await mongoose.connection.collections['users'].insertOne(admin)

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
            password: process.env.PASS,
            confirmPassword: process.env.PASS,
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
            password: process.env.PASS,
            confirmPassword: process.env.PASS,
            dni: '12345678A'
        }
        const response: Response = await request(app).post('/signup').send(user).set('Accept', 'application/json');
        expect(response.statusCode).toBe(412);
    });

    /**
     * Tests that a user can login.
     */
    it('can login correctly', async () => {
        const user = {
            username: 'Pablo1',
            password: process.env.PASS
        }
        const response: Response = await request(app).post('/login').send(user).set('Accept', 'application/json');

        token = response.header['authorization'];

        expect(response.statusCode).toBe(200);
    });

    /**
     * Tests that can find all the users
     */
    it('can find all the users', async () => {
        const user = {
            username: 'Pablo2',
            email: 'pablo2@email.com',
            password: process.env.PASS,
            confirmPassword: process.env.PASS,
            dni: '12345678B'
        }
        await request(app).post('/signup').send(user).set('Accept', 'application/json');
        const users = await ((await request(app).get('/user/list').set('Authorization', token).set('Username', admin.username)
            .set('Accept', 'application/json'))).body.users;

        expect(users.length).toBe(3);
    });

    /**
     * Tests find user by username.
     */
    it('can find user by username', async () => {
        const username = 'Pablo1';

        const user = await (await request(app).get(`/user/${username}`).set('Authorization', token).set('Username', admin.username)
        .set('Accept', 'application/json')).body.user[0];

        expect(user.username).toBe(username);
    });

    /**
     * Tests ban user by username
     */
    it('can delete user by username', async () => {
        const username = 'Pablo2';

        (await request(app).get(`/user/delete/${username}`).set('Authorization', token).set('Username', admin.username).set('Accept', 'application/json'));

        const users = await (await request(app).get('/user/list').set('Authorization', token).set('Username', admin.username).set('Accept', 'application/json')).body.users;

        let count = 0;
         users.forEach((user: IUser)  => {
             if (!user.status){
                count++;
            }
        });

        expect(count).toBe(1);
    });

    /**
     * Tests update user by id.
     */
    it('can update user', async () => {
        const user = {
            username: 'Pablo1',
            email: 'pablo123@email.com'
        }

        const userid = await (await request(app).get(`/user/${user.username}`).set('Authorization', token).set('Username', admin.username)
        .set('Accept', 'application/json')).body.user[0];

        (await request(app).post(`/user/update/${userid._id}`).set('Authorization', token).set('Username', admin.username)
        .send(user).set('Accept', 'application/json'));

        const updatedUser = await (await request(app).get(`/user/${user.username}`).set('Authorization', token).set('Username', admin.username)
        .set('Accept', 'application/json')).body.user[0];

        expect(user!.email).toBe(updatedUser!.email);
    });

    /**
     * Test that a address can be getted from a POD
     */
    it('can get address', async () => {
        const name = {
            pod: 'sergiomalv'
        }

        const expected = {
            country_name: 'España',
            region: 'Asturias',
            locality: 'Oviedo',
            street_address: 'Agapito 13',
            postal_code: '123'
        }

        const address = await (await request(app).post('/user/pod').send(name).set('Authorization', token).set('Accept', 'application/json')).body;
        expect(address['result']).toStrictEqual(expected)
    });

    /**
     * Test that a address can not be getted from a POD
     */
    it('cant get address', async () => {
        const name = {
            pod: 'NOsergiomalv'
        }

        const response: Response = await request(app).post('/user/pod').send(name).set('Authorization', token).set('Accept', 'application/json');
        expect(response.statusCode).toBe(404);
    });
});

//------------------------------PRODUCTS------------------------------
describe('products ', () => {

    /**
     * Tests that a product can be created.
     */
    it('can be created correctly', async () => {
        const product = {
            name: "Laptop",
            description: "Simple laptop",
            basePrice: 1345,
            IVA: 0.21,
            units: 4,
            categories: ["laptop", "celullar"],
            urlImage: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4LqQX?ver=1f00"
        }
        const response: Response = await request(app).post('/product/add').set('Authorization', token).set('Username', admin.username)
        .send(product).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    });

    /**
     * Test that a product cannot be created
     */
    it('cannot be created [DONT PROVIDE NAME]', async () => {
        const product = {
            description: "Simple laptop",
            basePrice: 1345,
            IVA: 0.21,
            units: 4,
            categories: ["laptop", "celullar"],
            urlImage: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4LqQX?ver=1f00"
        }
        const response: Response = await request(app).post('/product/add').set('Authorization', token).set('Username', admin.username)
        .send(product).set('Accept', 'application/json');
        expect(response.statusCode).toBe(400);
    });

    /**
     * Test that all the products can be founded
     */
    it('can founded all', async () => {
        const products = await (await request(app).get('/product/list').set('Accept', 'application/json')).body.products;
        expect(products.length).toBe(1);
    });

    /**
     * Test that a product can be updated
     */
    it('can be updated', async () => {
        const productToUpdate = {
            units: 20,
            description: 'Simple test'
        }

        const product = await (await request(app).get('/product/list').set('Accept', 'application/json')).body.products[0]['_id'];
        await request(app).post('/product/update/' + product).set('Authorization', token).set('Username', admin.username)
            .send(productToUpdate).set('Accept', 'application/json');
        const updatedProduct = await (await request(app).get('/product/list').set('Accept', 'application/json')).body.products[0];
        expect(updatedProduct.units).toBe(20);
    });

    /**
     * Test that a product can be filtered by its category
     */
    it('can be filtered', async () => {
        const category = 'laptop';

        const product = await (await request(app).get(`/product/filter/${category}`).set('Accept', 'application/json')).body.products;

        expect(product.length).toBe(1);
    });

    /**
     * Test that a product can be deleted
    */
    it('can be deleted', async () => {
        const product = await (await request(app).get('/product/list').set('Accept', 'application/json')).body.products[0]['_id'];
        await (await request(app).get('/product/delete/' + product).set('Authorization', token).set('Username', admin.username)
            .set('Accept', 'application/json')).body.products;
        const units = await (await request(app).get('/product/list').set('Accept', 'application/json')).body.products;
        expect(units.length).toBe(0);
    });

});
