<script lang="ts">
  import { getBot } from "$lib/bot.svelte";
  import { Files, CircleCheck } from "lucide-svelte";

  const bot = $derived.by(getBot);

  const shortAddress = $derived(bot?.address.slice(0, 6) + "…" + bot?.address.slice(-4));

  let addressCopied = $state(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(bot?.address ?? "");
    addressCopied = true;

    setTimeout(() => {
      addressCopied = false;
    }, 1000);
  };
</script>

{#if bot}
  <div
    class="absolute bottom-0 right-0 rounded-tl-2xl border-l-2 border-t-2 border-yellow-400 bg-yellow-200/25 px-6 py-4 text-white"
  >
    <div class="flex items-center gap-x-4">
      <div class="avatar placeholder">
        <div class="w-16 rounded-full bg-neutral"></div>
      </div>

      <p class="text-lg">Profile: <span class="font-bold">[BOT 101]</span></p>
    </div>

    <button onclick={copyAddress} class="flex gap-x-2">
      <span>
        Address:
        <span class="font-mono font-bold">{shortAddress}</span>
      </span>

      {#if !addressCopied}
        <Files size="20" />
      {:else}
        <CircleCheck size="20" />
      {/if}
    </button>
  </div>
{/if}
