export enum Stage {
  INIT,
  CREATE_CONTRACT,
  ADD_ADDRESS,
  SEND_ETHER_SIGNATURE,
  SEND_ETHER_BODY,
  CALL_COUNT_MAPPING,
  SEND_ETHER_CHECKS,
  RUN_SEND_ETHER,
  BOT_INTERFACE,
}

type Dialogue =
  | {
      type: "dialogue";
      id: number;
      name: string;
      text: string;
    }
  | {
      type: "choice";
      id: number;
      choices: string[];
      choice: number;
    };

export type GameState = {
  stage: Stage;
  loaded: boolean;
  dialogueHistory: Dialogue[];
};

const DEFAULT_GAME_STATE: GameState = {
  stage: Stage.INIT,
  loaded: false,
  dialogueHistory: [],
};

let gameState = $state(DEFAULT_GAME_STATE);

if (typeof localStorage !== "undefined") {
  const savedState = localStorage.getItem("gameState");
  if (savedState) {
    gameState = { ...DEFAULT_GAME_STATE, ...JSON.parse(savedState), loaded: true };
  } else {
    gameState = { ...DEFAULT_GAME_STATE, loaded: true };
  }
}

const storeGameState = () => {
  localStorage.setItem("gameState", JSON.stringify({ ...gameState, loaded: false }));
};

export const getGameState = () => gameState;

export const setGameState = (newState: GameState) => {
  gameState = newState;
  storeGameState();
};

export const nextStage = () => {
  setGameState({
    ...getGameState(),
    stage: getGameState().stage + 1,
  });
};

// TODO: Can we figure out how to only save dialogue when advancing stage?
// otherwise, we're saving the same dialogue over and over, and using `hash` as a crutch
export const addDialogue = (dialogue: Dialogue) => {
  setGameState({
    ...gameState,
    dialogueHistory: [...gameState.dialogueHistory, dialogue],
  });
};

export const resetGame = () => {
  setGameState({ ...DEFAULT_GAME_STATE, loaded: true });
};
