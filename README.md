# Fweb3 Faucets (wip)

mumbai contracts:
```json
{
  "fweb3AdminNft": "0x07Dd489aeb1429FE790376489d77E261E3998917",
  "fweb3DiamondNft": "0xa6ea886e30561df6E8b5D3012b71E01cD5139C12",
  "fweb3Erc20Faucet": "0x6614438D1FA443b6163F2A655E6C57F3546b3465",
  "fweb3EthFaucet": "0xc6B8d8BCc80b738e78DAD3F285F0CB2A082445d4",
  "fweb3Game": "0x55DF5aB9Efe978481A8905d1Fd4b2f99D41c1D34",
  "fweb3Poll": "0xe3D18630b36Be4afB9E36971AAa7d41f0c0B52E3",
  "fweb3Token": "0x30fBc356F2AcC79F18121C736867bB1CcA535b22",
  "fweb3Trophy": "0x81D9717F25519DFefF30A7708826ee6Bb2785ab2"
}
```

## Development

1. Clone the [contracts repo](https://github.com/fweb3/contracts)
2. Follow the readme to setup local contracts to use with this app
3. Make sure you copy over your deployed addresses into `./constants.js`
4. Run the faucet with `yarn dev`


TODO:
- add local dev for FE
- add captcha
- add user data to account when faucet is used to cut down on api requests
- add tests
- match game styles
- admin panel
