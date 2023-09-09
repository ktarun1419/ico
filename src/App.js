import logo from "./logo.svg";
import "./App.css";
import Main from "./components/Main/Main";
import { Web3OnboardProvider, init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
const INFURA_KEY = 'e2bfa4d67a7248a4a7db0f83607da160'
const ethereumRopsten = {
  id: '0x5',
  token: 'gETH',
  label: 'Ethereum Goeril',
  rpcUrl: `https://goerli.infura.io/v3/${INFURA_KEY}`
}
const chains = [ethereumRopsten]
const wallets = [injectedModule()]
const web3Onboard = init({
  wallets,
  chains,
  appMetadata: {
    name: 'Web3-Onboard Demo',
    icon: '<svg>App Icon</svg>',
    description: 'A demo of Web3-Onboard.'
  }
})
// import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
// import { Web3Modal } from '@web3modal/react'
// import { configureChains, createConfig, WagmiConfig } from 'wagmi'
// import { arbitrum, mainnet, polygon ,goerli } from 'wagmi/chains'

// const chains = [goerli]
// const projectId = '6037240fa4db7ddb1dd8ab12b3493eb5'

// const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
// const wagmiConfig = createConfig({
//   autoConnect: false,
//   connectors: w3mConnectors({ projectId, chains }),
//   publicClient
// })
// const ethereumClient = new EthereumClient(wagmiConfig, chains)
function App() {
  return (
    <>
     <Web3OnboardProvider web3Onboard={web3Onboard}>

        <div className="App">
          <Main />
        </div>
     </Web3OnboardProvider>
      {/* <WagmiConfig config={wagmiConfig}>
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} /> */}
    </>
  );
}

export default App;
