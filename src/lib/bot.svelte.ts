import { isHex, type Hex } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import bot101Avatar from "$assets/avatars/bot101.png";

let botPrivateKey = $state<Hex | null>(null);

if (typeof localStorage !== "undefined") {
  const storedKey = localStorage.getItem("botPrivateKey");

  if (storedKey && isHex(storedKey)) {
    botPrivateKey = storedKey;
  } else {
    botPrivateKey = generatePrivateKey();
    localStorage.setItem("botPrivateKey", botPrivateKey);
  }
}

const botAccount = $derived(botPrivateKey ? privateKeyToAccount(botPrivateKey) : undefined);

export const getBot = () =>
  botAccount
    ? {
        address: botAccount.address,
      }
    : undefined;

export const getBotProfile = () =>
  botAccount
    ? {
        address: botAccount.address,
        name: "[BOT 101]",
        avatar: bot101Avatar,
      }
    : undefined;
