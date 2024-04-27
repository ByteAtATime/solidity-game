<script lang="ts">
  const { text, onclick }: { text: string; onclick: () => void } = $props();
</script>

<button class="btn btn-secondary btn-sm font-sans" {onclick}>{text}</button>
