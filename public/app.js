/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const socket = io();

const client = feathers();

client.configure(feathers.socketio(socket));

client.configure(feathers.authentication({
  storage: window.localStorage
}));

const login = async () => {
  try {
    return await client.reAuthenticate ();
  } catch(error) {
    return await client.authenticate({
      strategy: 'local', 
      email: 'Mathe@gmail.com',
      password: 'matspassword'
    });
  }
};

const main = async () => {
  const auth = await login ();

  console.log('User is authenticated', auth);


  await client.logout();
};

main();