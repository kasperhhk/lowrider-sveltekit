<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<nav>
  <a href="https://google.com">google!</a>
  <span>{data.username}</span>
  <form method="GET" action="/logout">
    <button>Log out</button>
  </form>
</nav>
<main>
  <slot />
</main>
