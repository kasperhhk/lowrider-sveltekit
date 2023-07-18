<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<nav>
  <a href="https://google.com">google!</a>

  <div class="spacer"></div>

  <span>{data.username}</span>
  <form method="GET" action="/logout">
    <button>Log out</button>
  </form>
</nav>

<slot />

<style lang="scss">
  nav {
    background-color: grey;
    position: sticky;
    top: 0px;
    display: flex; 
    padding: 10px;
    gap: 10px;
  }

  .spacer {
    margin-left: auto;
  }
</style>