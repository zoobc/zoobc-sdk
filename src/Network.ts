const list = [
  {
    ip: 'https://n0.alpha.proofofparticipation.network:8443',
    default: true,
    name: 'Alpha Testnet',
  },
  {
    ip: 'http://172.104.34.10:8002',
    default: true,
    name: 'Local Testnet',
  },
  {
    ip: 'http://45.79.39.58:8002',
    default: true,
    name: 'Demo Testnet',
  },
];

var selected = list[0].ip;

export default { list, selected };
