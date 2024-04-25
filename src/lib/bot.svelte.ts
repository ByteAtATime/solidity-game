import { isHex, type Hex } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

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
