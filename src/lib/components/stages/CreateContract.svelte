<script lang="ts">
  import Dialogue from "$lib/components/Dialogue.svelte";
  import CodeForm from "../CodeForm.svelte";

  const { next }: { next: () => void } = $props();

  const matchPatterns = { contract: /^contract\s+GoodBot(\s*\/)?$/ };
</script>

<!-- TODO: how can we make this transitino smoother? -->
<Dialogue
  dialogue={[`Let's start by creating a contract. Name it "GoodBot".`]}
  name="System"
  absolute
/>

<CodeForm
  onsubmit={next}
  {matchPatterns}
  hints={[
    `Are you sure you named it "GoodBot"?`,
    `A contract is declared using <code>contract [name]</code>.`,
  ]}
  answers={{
    contract: {
      content: "contract GoodBot",
      reason: "This is how you declare a contract in Solidity.",
    },
  }}
  fullCode={`
[contract:contract GoodBot] {

}
`}
></CodeForm>
