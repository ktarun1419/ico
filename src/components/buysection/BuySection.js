import React, { useEffect, useState } from "react";
import "./BuySection.css";
import ProgressBar from "@ramonak/react-progress-bar";
// import { useContractRead, useAccount, useContractWrite } from "wagmi";
import { BUSD, ICO } from "../../utils/address";
import { icoABI, tokenABI } from "../../utils/ABI";
import { useWeb3Onboard } from "@web3-onboard/react/dist/context";
import Web3 from "web3";
import { useConnectWallet } from "@web3-onboard/react";
// import { Web3Button } from "@web3modal/react";
const BuySection = () => {
  const [tokenSold, setTokenSold] = useState(23456);
  const [tokenLeft, setTokenLeft] = useState(234566);
  const [soldpercent, setSoldPercent] = useState(10);
  const [amount, setAmount] = useState();
  const [tokens, setTokens] = useState();
  const [price, setPrice] = useState(4000);
  const [{ wallet }] = useConnectWallet();
  const [web3, setWeb3] = useState();
  const [icoContract, setIcoContract] = useState();
  const [busdContract, setBusdContract] = useState();
  const [approveAmt, setApproveAmt] = useState();
  const [userDetails,setUserDetails]=useState({
    deposit_amount:0,
    unique_id:null,
    token_receive:0,
  })
  useEffect(() => {
    if (wallet) {
      console.log("callled");
      let web_3 = new Web3(wallet?.provider);
      setWeb3(web_3);
      let ico = new web_3.eth.Contract(icoABI, ICO);
      let busd = new web_3.eth.Contract(tokenABI, BUSD);
      ico.methods
        .tokenPrice()
        .call()
        .then((price) => {
          setPrice(Number(price));
        });
      busd.methods
        .allowance(wallet.accounts[0]?.address, ICO)
        .call()
        .then((res) => {
          setApproveAmt(Number(res));
        });
      setIcoContract(ico);
      setBusdContract(busd);
      getUserDetails()
    }
  }, [wallet]);
  const getUserDetails=()=>{
    if (wallet) {
      icoContract.methods.getUserDetails().call().then((res)=>{
        console.log('user',res);
        let obj={
          deposit_amount:res?.depositAmount,
          unique_id:res?.uniqueId,
          token_receive:res?.virtualNumber,
        }
        setUserDetails(obj)
      })
    }
  }
  const approve=async(amount)=>{
  let tx={
    from: wallet.accounts[0]?.address,
    to:BUSD,
    data:busdContract.methods.approve( wallet.accounts[0]?.address,amount).encodeABI()
  }
  web3.eth.sendTransaction(tx).then((res)=>{
    return true
  }).catch((e)=>{
    console.log({e});
  })
  }
  const deposit=(amount)=>{
    let tx={
      from: wallet.accounts[0]?.address,
      to:ICO,
      data:icoContract.methods.depositAndReceiveToken(amount).encodeABI()
    }
    web3.eth.sendTransaction(tx).then((res)=>{
      return true
    }).catch((e)=>{
      console.log({e});
    })
  }
  const sendTransaction =async () => {
    if (wallet) {
      let amt = String(Number(amount) * 10 ** 9) + "000000000";
      
      if (approveAmt/10**18<amount) {
        let approval=await approve(amt)
        if (approval) {
          deposit(amt)
        }
      }else{
        deposit(amt)
      }
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (isNaN(value)) {
      return;
    }
    setAmount(value);
    setTokens((value * 10000) / Number(price || 4000));
  };

  return (
    <div className="buy_container">
      <div className="block_1">
        <div className="head_1">GET READY TO BUY</div>
        <div className="head_2">The Exclusive and limited</div>
        <div className="head_3">AIMB</div>
        <div className="head_4">$1 = {10000 / Number(price)} AIMB</div>
        <div className="head_5">The Future Of AI is here</div>
      </div>
      <div className="block_2">
        <div className="block_2_heading">TOKEN TO AI WORLD</div>
        <div className="amount_container">
          <div>Sold:{tokenSold}</div>
          <div>Left:{tokenLeft}</div>
        </div>
        <div className="progress">
          <ProgressBar
            completed={soldpercent}
            height="30px"
            customLabel={`${soldpercent}%`}
            bgColor="#1499F8"
            //completedClassName="barCompleted"
          />
          <h2>{soldpercent} % completed</h2>
        </div>
        <div className="input_container">
          <div className="each_input">
            <div className="currency">$BUSD</div>
            <input
              placeholder="Amount"
              value={amount}
              onChange={handleChange}
            />
          </div>
          <div className="each_input">
            <div
              className="currency"
              style={{ background: "white", color: "black" }}
            >
              $AIMB
            </div>
            <input disabled value={tokens} />
          </div>
        </div>
        {true ? (
          <button className="buy_button" onClick={sendTransaction}>
            BUY NOW
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default BuySection;
