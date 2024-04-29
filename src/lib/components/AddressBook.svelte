<script lang="ts">
  import { CircleCheck, Files } from "lucide-svelte";

  const { profiles }: { profiles: { address: string; name: string; avatar?: string }[] } = $props();

  const addressCopied = $state(Array(profiles.length).fill(false));

  const copyAddress = (address: string, index: number) => () => {
    navigator.clipboard.writeText(address);
    addressCopied[index] = true;

    setTimeout(() => {
      addressCopied[index] = false;
    }, 1000);
  };
</script>

<div
  class="absolute bottom-0 left-0 right-0 border-t-2 border-yellow-400 bg-yellow-200/25 px-6 py-4 text-white sm:left-auto sm:rounded-tl-2xl sm:border-l-2"
>
  <h1 class="mb-3 text-xl font-bold">Address Book</h1>

  <div class="grid grid-cols-3 gap-4">
    {#each profiles as profile, i}
      {@const shortAddress = profile.address.slice(0, 5) + "…" + profile.address.slice(-4)}

      <div class="flex flex-col items-center">
        <div class="avatar" class:placeholder={!profile.avatar}>
          <div class="w-16 rounded-full bg-black">
            {#if profile.avatar}
              <img src={profile.avatar} alt={profile.name} class="!w-16 rounded-full bg-black" />
            {/if}
          </div>
        </div>

        <p class="font-bold"><span class="font-bold">{profile.name}</span></p>
        <button
          class="flex gap-x-1 font-mono text-slate-300"
          onclick={copyAddress(profile.address, i)}
        >
          {shortAddress}

          {#if !addressCopied[i]}
            <Files size="20" />
          {:else}
            <CircleCheck size="20" />
          {/if}
        </button>
      </div>
    {/each}
  </div>
</div>
