/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const socket = io();

const client = feathers();

client.configure(feathers.socketio(socket));

client.configure(feathers.authentication({
  storage: window.localStorage
}));

const login = async (credentials) => {
  try {
    if (!credentials) {
      await client.reAuthenticate();
    } else {
      await client.authenticate({
        strategy: 'local',
        ...credentials,
      });
    }

    //show chat msgs
    console.log('signup / login success! go to chat window ... ')

  } catch (error) {
    showLogin(error);
  }
};
const main = async () => {
  const auth = await login();

  console.log('User is authenticated', auth);


  await client.logout();
};

main();

const loginHTML = `
<main class="login container">
  <div class="row">
    <div class="col-12 col-6-tablet push-3-tablet  text-center heading">
      <h1 class="font-100">Log in or signup</h1>
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-6-tablet push-3-tablet col-4-desktop push-4-desktop">
      <form class="form">
        <fieldset>
          <input class="block" type="email" name="email" placeholder="email">
        </fieldset>
        <fieldset>
        <input class="block" type="password" name="password" placeholder="password">
      </fieldset>
      <button type="button" id="login" class="button-primary block signup">
      log in
      </button>
      <button type="button" id="signup" class="button-primary block signup">
      Sign up and log in
      </button>
      <a class="button button-primary block" href="/oauth/github">Log in with GitHub</a>
      </form>
    </div>
  </div>
</main>
`;

const chatHTML = `
<main class="flex flex-column">
  
</main>
`

const showLogin = (error) => {
  if (document.querySelectorAll('.login').length && error) {
    document.querySelector('.heading').insertAdjacentHTML('beforeend', `<p> There was an error: $(error.message)</p>`)
  } else {
    document.getElementById('app').innerHTML = loginHTML;
  }
};
const getCredentials = () => {
  const user = {
    email: document.querySelector('[name="email"]').value,
    password: document.querySelector('[name="password"]').value
  };
  return user;
};

const addEventListener = (selector, event, handler) => {
  document.addEventListener(event, async ev => {
    if (ev.target.closest(selector)) {
      handler(ev);
    }
  });
};

addEventListener('#signup', 'click', async () => {
  const credentials = getCredentials();


  await client.service('users').create(credentials);

  await login(credentials);
});