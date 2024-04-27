<script lang="ts">
  import { HIGHLIGHT_OPTIONS } from "$lib/code";
  import { codeToHtml } from "shiki";

  const { code }: { code: string } = $props();

  const highlightPromise = codeToHtml(code.trim(), HIGHLIGHT_OPTIONS);
</script>

<div class="flex w-full max-w-xl flex-col">
  {#await highlightPromise then highlighted}
    {@html highlighted}
  {/await}
</div>
