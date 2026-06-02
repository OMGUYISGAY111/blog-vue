import axios from 'axios';

const BaseLink = "http://localhost:3000";

const client = axios.create({
    baseURL: BaseLink,
    headers: { 'Content-Type': 'application/json' },
})

export async function hellowocao():Promise<string> {

    const hi = await client.get('/api/hello');

    console.log(hi);

    return hi.data;

}