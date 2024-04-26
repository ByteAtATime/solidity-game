<script lang="ts">
  import type { Snippet } from "svelte";
  import { ANSWER_REVEAL_DELAY } from "$lib/constants";

  let {
    children,
    hints = [],
    values = $bindable({}),
    answers,
  }: {
    children: Snippet<[input: Snippet<[key: string]>]>;
    hints?: string[] | undefined;
    values?: Record<string, string> | undefined;
    answers?: Record<string, string> | undefined;
  } = $props();

  let usedHints: string[] = $state([]);

  const revealAnswer = () => {
    const answerKeys = Object.keys(answers ?? {});
    let currentAnswer = 0;
    let currentIndex = 1;

    let interval = setInterval(() => {
      if (!answers) return;

      const key = answerKeys[currentAnswer];

      if (!(key in answers)) return;

      values = { ...values, [key]: answers[key]?.slice(0, currentIndex) };

      if (currentIndex === answers[key].length) {
        if (currentAnswer === answerKeys.length - 1) {
          clearInterval(interval);
        } else {
          currentIndex = 1;
          currentAnswer++;
        }
      } else {
        currentIndex++;
      }
    }, ANSWER_REVEAL_DELAY);
  };
</script>

{#snippet input(key)}
  <input
    oninput={(e) => (values = { ...values, [key]: e.currentTarget.value })}
    value={values[key]}
    type="text"
    placeholder="Type your code here..."
    class="input input-bordered input-primary my-2 w-full border-2"
  />
{/snippet}

<div class="flex w-full max-w-xl flex-col">
  <pre class="mb-4 flex w-full justify-center"><code class="w-full">{@render children(input)}</code
    ></pre>

  {#if hints.length > usedHints.length}
    <button
      class="font-bold text-info"
      type="button"
      onclick={() => {
        const hint = hints[usedHints.length];
        if (hint) usedHints = [hint, ...usedHints];
      }}
    >
      {#if usedHints.length === 0}
        Stuck?
      {:else}
        Still stuck?
      {/if}
    </button>
  {:else if answers}
    <button class="font-bold text-success" type="button" onclick={revealAnswer}>
      Reveal answer
    </button>
  {/if}

  <div class="mt-2 flex flex-col gap-y-4">
    {#each usedHints as hint}
      <div class="card card-compact bg-info text-info-content">
        <div class="card-body"><p>{@html hint}</p></div>
      </div>
    {/each}
  </div>
</div>
