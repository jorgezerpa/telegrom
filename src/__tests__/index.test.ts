import * as dotenv from 'dotenv';
import app from '../app'
import request from 'supertest'
import mongoose from 'mongoose'
import { ConnectDB } from '../db';

dotenv.config()
const TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImtxZFEtQlh0cnlVREc3bk1EOHI2cCJ9.eyJpc3MiOiJodHRwczovL2Rldi14N3p3emtqcDJqaGVqbnc1LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJOSGQ4cjhmMkV2ZlZPMDE2VklUc3ZLd2lBWG42dm9Hb0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly90ZWxlZ3JvbS5jb20iLCJpYXQiOjE2NzE2MjUwODYsImV4cCI6MTY3MTcxMTQ4NiwiYXpwIjoiTkhkOHI4ZjJFdmZWTzAxNlZJVHN2S3dpQVhuNnZvR28iLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.AMbaHMm_J36q-guvtDJfFmnDSa1e7hoMR73LL4CganhmrjloOwa2AsMEa3j0gQ32KPpEkmwWzSSg3Af66TJL153hB-bI3oqCtl9-miFLZHCyYvR2Lak9N3gXzp4SqEPwwv7vbTpxE_28oZ3JlnzxQyFnd48Tpue7lypyXkpfeYBJKNbrwEktkJu9WtYaqDGkiKcUscv8BGhkPjnU-jhUHHsXuRfFRu9Vvk-Ix99nFUiB-A-czx7ziHpzwca7tHbhOKzU_zD-Ih_b3RAbWLWdZ7ObRx4daort2RdBwHKdJ28jvBwr7Dk4Fg7atJrfzP5ciSwe82rJYWzUHTfBLvFYVg'

beforeAll(async() => {
    await ConnectDB(process.env.DB_URI as string);     
})
afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
        .then(()=>done())
        .catch(error=>{
            console.log('error on after all',error);
            done()
        }) 
})

describe('USERS ENDPOINTS', ()=>{
    it('createUser', (done)=>{
        request(app)
        .post('/users/create')
        .send({ "name":"test user", "age":20 })
        .set({ "Authorization":`Bearer ${TOKEN}` })
        .expect('Content-Type', /json/)
        .expect(201, done)
    })

    it('getUsers', (done)=>{
        request(app)
        .get('/users')
        .set({ "Authorization":`Bearer ${TOKEN}` })
        .expect('Content-Type', /json/)
        .expect(200, done)
    })    
})

