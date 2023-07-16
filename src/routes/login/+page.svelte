<script lang="ts">
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<h1>Login page</h1>
<form method="POST">
  <label>
    Username
    <input type="text" name="username" value={form?.username ?? ""} />
  </label>
  <label>
    Password
    <input type="password" name="password" />
  </label>
  <input type="submit" value="Log in" />
</form>
