import styled from "styled-components";
import { PriceData } from "./Coin";

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-top: 10px;
`;

interface PriceProps {
  coinId: string;
  tickersData?: PriceData;
}

function Price({ coinId, tickersData }: PriceProps) {
  return (
    <>
      <h1>{coinId}</h1>
      <Overview>
        <span>{`ath_date : ${tickersData?.quotes.USD.ath_date}`}</span>
      </Overview>
      <Overview>
        <span>{`ath_price : ${tickersData?.quotes.USD.ath_price}`}</span>
      </Overview>
      <Overview>
        <span>{`market_cap : ${tickersData?.quotes.USD.market_cap}`}</span>
      </Overview>
      <Overview>
        <span>{`price : ${tickersData?.quotes.USD.price}`}</span>
      </Overview>
    </>
  );
}

export default Price;
