import Web3 from 'web3';

async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else {
        console.log('Please install MetaMask!');
    }
}
loadWeb3();
