<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import type { PageData } from "./$types";
  import { connect, disconnect } from "$lib/client/websocket/client";
  import { chatMessages } from "$lib/client/websocket/chat/stores";
  import { send } from "$lib/client/websocket/send";

  export let data: PageData;

  onMount(() => {
    connect(data.websocketServer, data.username);
  });

  onDestroy(() => {
    disconnect();
  });

  let chatmsg = "";
  function handleSubmit() {
    if (chatmsg) {
      send.chat.chatMessage({ message: chatmsg });
      chatmsg = "";
    }
  }
</script>

<h1>Welcome {data.username}</h1>
<div>
  {#each $chatMessages as msg (msg.timestamp)}
    <div>
      {#if msg.type === "CHAT:CHATMSG"}
        <span>{msg.timestamp.format("hh:mm")}</span><span>{msg.user}</span><span
          >{msg.message}</span
        >
      {:else if msg.type === "chatclientmessage"}
        <span>{msg.timestamp.format("hh:mm")}</span><span>{msg.message}</span>
      {/if}
    </div>
  {/each}
</div>
<br />
<form on:submit|preventDefault={handleSubmit}>
  <input type="text" bind:value={chatmsg} />
</form>
