<script lang="ts">
  import { ANSWER_REVEAL_DELAY } from "$lib/constants";
  import Hints from "./Hints.svelte";
  import CodeInput from "./CodeInput.svelte";
  import { parseCode } from "$lib/code";
  import { codeToHtml } from "shiki";
  import { Element, Html, Text, isTag } from "html-svelte-parser";

  let {
    fullCode,
    hints = [],
    values = $bindable({}),
    answers,
  }: {
    fullCode: string;
    hints?: string[] | undefined;
    values?: Record<string, string> | undefined;
    answers?: Record<string, { content: string; reason?: string }> | undefined;
  } = $props();

  let answersRevealed = $state(false);

  const revealAnswer = () => {
    answersRevealed = true;

    const answerKeys = Object.keys(answers ?? {});
    let currentAnswer = 0;
    let currentIndex = 1;

    let interval = setInterval(() => {
      if (!answers) return;

      const key = answerKeys[currentAnswer];

      if (!(key in answers)) return;

      values = { ...values, [key]: answers[key]?.content.slice(0, currentIndex) };

      if (currentIndex === answers[key].content.length) {
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

  const { code, decorations } = parseCode(fullCode);

  // TODO: Can we somehow delegate this to the server?
  const highlightPromise = codeToHtml(code, {
    lang: "solidity",
    theme: "aurora-x",
    decorations,
  });

  const processNode = (node: Element | Text) => {
    if (isTag(node)) {
      const className = node.attributes.find((attr) => attr.name === "class")?.value;

      if (className) {
        const inputRes = /input-(\w+)/.exec(className);

        if (node.tagName === "span" && inputRes) {
          const key = inputRes[1];

          return {
            component: CodeInput,
            props: {
              value: values[key],
              showTooltip: answersRevealed,
              tooltip: answers?.[key]?.reason,
              onchange: (val: string) => {
                values = { ...values, [key]: val };
              },
            },
          };
        }
      }
    }
  };
</script>

<div class="flex w-full max-w-xl flex-col">
  {#await highlightPromise then highlighted}
    <Html html={highlighted} {processNode} />
  {/await}

  {#if hints}
    <Hints {hints} {revealAnswer} />
  {/if}
</div>
