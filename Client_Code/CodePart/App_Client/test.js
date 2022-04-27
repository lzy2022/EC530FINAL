import Client from './client.js';

var c1 = new Client();

await c1.user_login(1, 'admin');
await c1.get_user_list();