import axios from "axios";
import { Battlers } from "../App";
const apiPath: string = "https://listrankerapi.fly.dev/api";

export const getPremades = async () => {
  try {
    const response = await axios.get(`${apiPath}/premades`);
    return response.data;
  } catch (error) {
    console.error("API error:, ", error);
    return null;
  }
};

export const sendChoice = async (choice: string) => {
  const message = JSON.stringify({ selection: choice });
  await axios.post(`${apiPath}/listchoice`, message);
};

export const receiveBattlers = async (
  battleSetter: React.Dispatch<React.SetStateAction<Battlers[]>>,
  rankingSetter: React.Dispatch<React.SetStateAction<string[]>>
) => {
  try {
    const response = await axios.post(`${apiPath}/battlers`);
    if (response.data.results) {
      rankingSetter(response.data.results);
      battleSetter([]);
      return;
    } else {
      battleSetter(response.data.battlers);
    }
  } catch (error) {
    console.log(error);
  }
};

export const sendBattleChoice = async (choice: string) => {
  const message = JSON.stringify({ selection: choice });
  await axios.post(`${apiPath}/battlerChoice`, message);
};
