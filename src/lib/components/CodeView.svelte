<script lang="ts">
  import { HIGHLIGHT_OPTIONS } from "$lib/code";
  import { codeToHtml } from "shiki";
  import { parseCodeWithButtons } from "$lib/code";
  import { Element, Html, Text, isTag } from "html-svelte-parser";
  import CodeButton from "./CodeButton.svelte";

  const { code: rawCode, actions = [] }: { code: string; actions?: (() => void)[] | undefined } =
    $props();

  const { code, decorations } = parseCodeWithButtons(rawCode);

  const highlightPromise = codeToHtml(code.trim(), { ...HIGHLIGHT_OPTIONS, decorations });

  const processNode = (node: Element | Text) => {
    if (isTag(node)) {
      const className = node.attributes.find((attr) => attr.name === "class")?.value;
      if (!className) return;

      if (node.name === "span" && className.startsWith("button-")) {
        const buttonId = className.slice("button-".length);
        const text = node.attributes.find((attr) => attr.name === "data-button-text")?.value;

        return {
          component: CodeButton,
          props: { text, onclick: actions[parseInt(buttonId)] },
        };
      }
    }
  };
</script>

<div class="flex w-full max-w-xl flex-col">
  {#await highlightPromise then highlighted}
    <Html html={highlighted} {processNode} />
  {/await}
</div>
