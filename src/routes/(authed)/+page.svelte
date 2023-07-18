<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import type { PageData } from "./$types";
  import { connect, disconnect } from "$lib/client/websocket/client";
  import { chatMessages } from "$lib/client/websocket/chat/stores";
  import { send } from "$lib/client/websocket/send";
  import moment from "moment";

  export let data: PageData;

  let interval: any = undefined;

  onMount(() => {
    //connect(data.websocketServer, data.username);
    let i = 1;
    const fill = new Array(10).fill(0).map((_) => ({
      type: "CHAT:CHATMSG",
      user: "test",
      message: "message" + i++,
      timestamp: moment(),
    }));
    //console.log(fill);
    chatMessages.set(fill as any);

    interval = setInterval(() => {
      const m = {
        type: "CHAT:CHATMSG",
        user: "test",
        message: "message" + i++,
        timestamp: moment(),
      };
      chatMessages.update(msgs => [...msgs, m as any]);
    }, 1000);
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
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

<div class="content">
  <main>
    <h1>Welcome {data.username}</h1>
  </main>
  <div class="chat-window">
    <div class="chat-messages">
      {#each $chatMessages as msg}
        <div>
          {#if msg.type === "CHAT:CHATMSG"}
            <span>{msg.timestamp.format("hh:mm")}</span><span>{msg.user}</span
            ><span>{msg.message}</span>
          {:else if msg.type === "chatclientmessage"}
            <span>{msg.timestamp.format("hh:mm")}</span><span
              >{msg.message}</span
            >
          {/if}
        </div>
      {/each}
    </div>
    <div class="chat-input">
      <form on:submit|preventDefault={handleSubmit}>
        <textarea
          bind:value={chatmsg}
          placeholder="Write something ..."
          autocomplete="off"
        />
      </form>
    </div>
  </div>
</div>

<style lang="scss">
  .content {
    display: flex;
    height: 100%;
    overflow-y: hidden;
  }

  .chat-window {
    margin-left: auto;
    width: 250px;
    display: flex;
    flex-direction: column;
    border-left: 1px solid rgba(155, 155, 155, 0.8);
  }

  .chat-messages {
    overflow-y: auto;
    flex-shrink: 1;
    flex-grow: 1;
    padding-left: 0.2em;
  }

  .chat-input {
    margin-top: auto;
    padding: 0.6em 0.6em 0 0.2em;
  }

  .chat-input textarea {
    resize: none;
    width: 100%;
    height: 5em;
  }
</style>
