import supertest from "supertest";
import { app } from "../src/app";	


app.ready()
export const testServer = supertest(app.server);