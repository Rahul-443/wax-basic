import * as waxjs from '@waxio/waxjs/dist';
import 'regenerator-runtime/runtime';

const loginBtn = document.getElementById('login');
const transactBtn = document.getElementById('transact');

const recipientNameInput = document.getElementById('recipient-name');
const amountInput = document.getElementById('amount-value');
const tokenSelect = document.getElementById('token-name');
const resultSection = document.querySelector('.section-result');

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

async function transact() {
  const recipientName = recipientNameInput.value;
  const amountVal = amountInput.value;
  const tokenVal = tokenSelect.value;

  if (recipientName != null && amountVal != null && tokenVal != null) {
    try {
      const result = await wax.api.transact(
        {
          actions: [
            {
              account: 'eosio.token',
              name: 'transfer',
              authorization: [
                {
                  actor: wax.userAccount,
                  permission: 'active'
                }
              ],
              data: {
                from: wax.userAccount,
                to: recipientName,
                quantity: `${amountVal} ${tokenVal}`,
                memo: ''
              }
            }
          ]
        },
        {
          blocksBehind: 3,
          expireSeconds: 1200
        }
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

loginBtn.addEventListener('click', login);
transactBtn.addEventListener('click', transact);
