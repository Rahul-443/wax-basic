import * as waxjs from '@waxio/waxjs/dist';
import 'regenerator-runtime/runtime';

const loginBtn = document.getElementById('login');

const wax = new waxjs.WaxJS({
  rpcEndpoint: 'https://wax.greymass.com'
});

async function login() {
  try {
    const userAccount = await wax.login();
    console.log(wax.userAccount);
  } catch (error) {
    console.log(error);
  }
}

loginBtn.addEventListener('click', login);
