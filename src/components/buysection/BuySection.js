import React, { useEffect, useState } from "react";
import "./BuySection.css";
import ProgressBar from "@ramonak/react-progress-bar";
import { useContractRead, useAccount, useContractWrite } from "wagmi";
import { BUSD, ICO } from "../../utils/address";
import { icoABI, tokenABI } from "../../utils/ABI";
import { Web3Button } from "@web3modal/react";
const BuySection = () => {
  const [tokenSold, setTokenSold] = useState(23456);
  const [tokenLeft, setTokenLeft] = useState(234566);
  const [soldpercent, setSoldPercent] = useState(10);
  const [amount, setAmount] = useState();
  const [tokens,setTokens]=useState()
  const { isConnected, address } = useAccount();
  let { data: price } = useContractRead({
    address: ICO,
    abi: icoABI,
    functionName: "tokenPrice",
  });
  const { data: Transaction, write } = useContractWrite({
    address: ICO,
    abi: icoABI,
    functionName: "depositAndReceiveToken",
  });
  const { data: ApproveAmount } = useContractRead({
    address: BUSD,
    abi: tokenABI,
    functionName: "allowance",
    args: [address, ICO],
  });
  const { data: Approved, writeAsync: ApproveContract  } = useContractWrite({
    address: BUSD,
    abi: tokenABI,
    functionName: "approve",
  });
  const sendTransaction = () => {
    console.log({ApproveAmount});
    let amt = String(Number(amount) * 10 ** 9) + "000000000";
   
    if (isConnected) {
      if (Number(ApproveAmount) / 10 ** 18 < amount) {
        ApproveContract({
          args: [ICO, amt],
          from: address,
        }).then((res) => {
          write({
            args: [amt],
            from: address,
          });
        })
      }
      else{
        write({
          args: [amt],
          from: address,
        });
      
      }
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (isNaN(value)) {
      return;
    }
    setAmount(value);
    setTokens(value*10000/Number(price || 4000))
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
        {isConnected ? (
          <button className="buy_button" onClick={sendTransaction}>
            BUY NOW
          </button>
        ) : (
          <Web3Button />
        )}
      </div>
    </div>
  );
};

export default BuySection;
