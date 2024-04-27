export enum Stage {
  INIT,
  CREATE_CONTRACT,
  ADD_ADDRESS,
  SEND_ETHER_SIGNATURE,
  SEND_ETHER_BODY,
  CALL_COUNT_MAPPING,
  RUN_SEND_ETHER,
  BOT_INTERFACE,
}

export type GameState = {
  stage: Stage;
  loaded: boolean;
};

const DEFAULT_GAME_STATE = {
  stage: Stage.INIT,
  loaded: false,
};

let gameState = $state(DEFAULT_GAME_STATE);

if (typeof localStorage !== "undefined") {
  const savedState = localStorage.getItem("gameState");
  if (savedState) {
    gameState = { ...JSON.parse(savedState), loaded: true };
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
