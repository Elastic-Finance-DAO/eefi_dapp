import { VaultContract } from "../components/Blockchain/Updater";
export const SET_VAULT_TYPE = 'SET_VAULT_TYPE';
export const FETCH_AMPL_BALANCE = 'FETCH_AMPL_BALANCE';
export const FETCH_AMPL_AMPLESENSE_BALANCE = 'FETCH_AMPL_AMPLESENSE_BALANCE';
export const FETCH_KMPL_PRICE = 'FETCH_KMPL_PRICE';
export const FETCH_REWARD = 'FETCH_REWARD';
export const FETCH_ALLOWANCE = 'FETCH_ALLOWANCE';
export const MAKE_DEPOSIT = 'MAKE_DEPOSIT';
export const MAKE_WITHDRAWAL = 'MAKE_WITHDRAWAL';
export const FETCH_GAS_PRICE_FASTEST = 'FETCH_GAS_PRICE_FASTEST';
export const FETCH_GAS_PRICE_FAST = 'FETCH_GAS_PRICE_FAST';
export const FETCH_GAS_PRICE_AVERAGE = 'FETCH_GAS_PRICE_AVERAGE';
export const FETCH_DEPOSITS = 'FETCH_DEPOSITS';
export const FETCH_WITHDRAWALS = 'FETCH_WITHDRAWALS';
export const FETCH_CLAIMABLE_AMPLESENSE_BALANCE = 'FETCH_CLAIMABLE_AMPLESENSE_BALANCE';
export const MAKE_CLAIM = "MAKE_CLAIM";
export const FETCH_TOTAL_STAKED = "FETCH_TOTAL_STAKED";

export function setVaultType(vaultType) {
  return {
    type: SET_VAULT_TYPE,
    payload: vaultType
  };
}

export function fetchAMPLBalance(vaultTypes, web3, account) {
  const contract = new VaultContract(vaultTypes, web3, account);
  return function(dispatch) {
    contract.stakingTokenBalance().then(balance => {
      dispatch({
        type: FETCH_AMPL_BALANCE,
        payload: balance
      });
    });
  };
}

export function fetchAMPLAmplesenseBalance(vaultTypes, web3, account) {
  const contract = new VaultContract(vaultTypes, web3, account);
  return function(dispatch) {
    contract.stakedTokenTotalBalance().then(balance => {
      dispatch({
        type: FETCH_AMPL_AMPLESENSE_BALANCE,
        payload: balance
      });
    });
  };
}

export function fetchClaimableBalance(vaultTypes, web3, account) {
  const contract = new VaultContract(vaultTypes, web3, account);
  return function(dispatch) {
    contract.stakedTokenClaimableBalance().then(balance => {
      dispatch({
        type: FETCH_CLAIMABLE_AMPLESENSE_BALANCE,
        payload: balance
      });
    });
  };
}

export function fetchTotalStaked(vaultTypes, web3, account) {
  const contract = new VaultContract(vaultTypes, web3, account);
  return function(dispatch) {
    contract.totalStaked().then(balance => {
      dispatch({
        type: FETCH_TOTAL_STAKED,
        payload: balance
      });
    });
  };
}

export function fetchKMPLPrice(price) {
  return {
    type: FETCH_KMPL_PRICE,
    payload: price
  };
}

export function fetchReward(vaultTypes, web3, account) {
  const contract = new VaultContract(vaultTypes, web3, account);
  return function(dispatch) {
    contract.getReward().then(rewards => {
      dispatch({
        type: FETCH_REWARD,
        payload: {eth : rewards[0], token: rewards[1]}
      });
    });
  };
}

export function checkAllowance(amount) {
  return {
    type: FETCH_ALLOWANCE,
    payload: amount
  };
}
export function makeDeposit(vaultTypes, web3, account, valueWei, tx) {
  const contract = new VaultContract(vaultTypes, web3, account);
  const current_time = Math.floor(Date.now()/1000);
  return function(dispatch) {
    dispatch({
      type: MAKE_DEPOSIT,
      payload: {deposit_tx: tx}
    });
    contract.allowance().then(allowance => {
      const all = new web3.utils.BN(allowance.toString());
      checkAllowance(all);
      const to_allow = new web3.utils.BN(valueWei.gt(all)? valueWei.sub(all) : "0");
      if(to_allow > 0) {
        contract.approve(valueWei).once('transactionHash', hash_allowance => {
          contract.stake(valueWei.toString()).once('transactionHash', hash_deposit => {
            dispatch({
              type: MAKE_DEPOSIT,
              payload: {deposit_tx: {id: current_time, transactionHash: hash_deposit, allowanceHash: hash_allowance, returnValues: {amount: valueWei.toString()}, timestamp: current_time, mined: false, allowanceMined: false}}
            });
          }).then(receipt => {
            //after it's mined, update
            dispatch({
              type: MAKE_DEPOSIT,
              payload: {deposit_tx: {id: current_time, mined: true}}
            });
          });
        }).then(receipt => {
          //after it's mined, update
          dispatch({
            type: MAKE_DEPOSIT,
            payload: {deposit_tx: {id: current_time, allowanceMined: true}}
          });
        });
      } else {
        contract.stake(valueWei).once('transactionHash', hash_deposit => {
          dispatch({
            type: MAKE_DEPOSIT,
            payload: {deposit_tx: {id: current_time, transactionHash: hash_deposit, allowanceHash: null}}
          });
        }).then(receipt => {
          //after it's mined, update
          dispatch({
            type: MAKE_DEPOSIT,
            payload: {deposit_tx: {id: current_time, mined: true}}
          });
        });
      }
    });
  };
}
export function makeClaim(hash, mined) {
  return {
    type: MAKE_CLAIM,
    payload: {hash: hash, mined: mined}
  };
}
export function makeWithdrawal(vaultTypes, web3, account, valueWei, tx) {
  const contract = new VaultContract(vaultTypes, web3, account);
  const current_time = Math.floor(Date.now()/1000);
  return function(dispatch) {
    dispatch({
      type: MAKE_WITHDRAWAL,
      payload: {withdrawal_tx: tx}
    });
    contract.unstake(valueWei).once('transactionHash', hash => {
      //got tx
      dispatch({
        type: MAKE_WITHDRAWAL,
        payload: {withdrawal_tx: {id: current_time, transactionHash: hash}}
      });
    }).then(receipt => {
      dispatch({
        type: MAKE_WITHDRAWAL,
        payload: {withdrawal_tx: {id: current_time, mined: true}}
      });
    });
  };
}
export function fetchGasPriceFastest(price) {
  return {
    type: FETCH_GAS_PRICE_FASTEST,
    payload: price
  };
}
export function fetchGasPriceFast(price) {
  return {
    type: FETCH_GAS_PRICE_FAST,
    payload: price
  };
}
export function fetchGasPriceAverage(price) {
  return {
    type: FETCH_GAS_PRICE_AVERAGE,
    payload: price
  };
}
export function fetchDeposits(deposits) {
  return {
    type: FETCH_DEPOSITS,
    payload: deposits
  };
}
export function fetchWithdrawals(withdrawals) {
  return {
    type: FETCH_WITHDRAWALS,
    payload: withdrawals
  };
}
