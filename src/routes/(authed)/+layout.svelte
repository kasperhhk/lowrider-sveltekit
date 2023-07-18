<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="main">
  <nav>
    <a href="https://google.com">google!</a>

    <div class="spacer" />

    <span>{data.username}</span>
    <form method="GET" action="/logout">
      <button>Log out</button>
    </form>
  </nav>

  <slot />
</div>

<style lang="scss">
  nav {
    background-color: grey;

    top: 0px;
    display: flex;
    padding: 10px;
    gap: 10px;
  }

  .spacer {
    margin-left: auto;
  }

  .main {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
