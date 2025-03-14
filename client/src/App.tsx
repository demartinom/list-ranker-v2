import { useEffect, useState } from "react";
import {
  getPremades,
  receiveBattlers,
  sendBattleChoice,
  sendChoice,
} from "./api/api";

export type Battlers = {
  Name: string;
  Score: number;
};
export default function App() {
  const [premadeLists, setPremadeLists] = useState<string[]>([]);
  const [currentBattlers, setCurrentBattlers] = useState<Battlers[]>([]);
  const [finalRanking, setFinalRanking] = useState<string[]>([]);

  useEffect(() => {
    const fetchPremades = async () => {
      const data = await getPremades();
      if (data) setPremadeLists(data.premades);
    };
    fetchPremades();
  }, []);

  // Take array of premade lists and map them out to buttons for user to select list choice
  const premadeOptions = premadeLists.map((item: string) => (
    <button
      key={item}
      onClick={async () => {
        await sendChoice(item);
        receiveBattlers(setCurrentBattlers, setFinalRanking);
      }}
    >
      {item[0].toUpperCase() + item.substring(1)}
    </button>
  ));

  // Take list of round battlers and display as choices
  const battleOptions = currentBattlers.map(
    (battler: Battlers, index: number) => (
      <button
        key={index}
        onClick={async () => {
          await sendBattleChoice(battler.Name);
          receiveBattlers(setCurrentBattlers, setFinalRanking);
        }}
      >
        {battler.Name}
      </button>
    )
  );

  const rankingList = finalRanking.map((item: string, index: number) => (
    <p key={index}>
      {index + 1}: {item}
    </p>
  ));

  return (
    <div>
      {premadeLists.length > 0 && premadeOptions}
      {currentBattlers.length > 0 && battleOptions}
      {finalRanking.length > 0 && rankingList}
    </div>
  );
}
