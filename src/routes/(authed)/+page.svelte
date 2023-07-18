<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import type { PageData } from "./$types";
  import { connect, disconnect } from "$lib/client/websocket/client";
  import { chatMessages } from "$lib/client/websocket/chat/stores";
  import { send } from "$lib/client/websocket/send";

  //TODO: Make chat client as default export from chat lib instead of using websocket directly form component
  //TODO: features should use a shared websocket underneath
  //TODO: this also solves the typed "send" problem
  //TODO: chat client should query history api -> store, then open websocket and put things into store from there
  export let data: PageData;

  let chatMessagesDiv: HTMLDivElement;
  let chatInputForm: HTMLFormElement;
  let chatmsg = "";

  onMount(async () => {
    connect(data.websocketServer, data.username);

    await scrollChat();
  });

  const unsubscribe = chatMessages.subscribe(async _ => {
    if (chatMessagesDiv) {
      if (chatMessagesDiv.scrollTop + chatMessagesDiv.clientHeight === chatMessagesDiv.scrollHeight) {
        await scrollChat();
      }        
    }
  });

  onDestroy(() => {
    unsubscribe();
    disconnect();
  });

  function handleSubmit() {
    if (chatmsg) {
      send.chat.chatMessage({ message: chatmsg });
      chatmsg = "";
    }
  }

  function handleEnter(evt: KeyboardEvent) {
    if (evt.key === "Enter" && !evt.shiftKey) {
      evt.preventDefault();
      handleSubmit();
    }
  }

  async function scrollChat() {
    await tick(); // wait for messages to be rendered
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
  }
</script>

<div class="content">
  <main>
    <h1>Welcome {data.username}</h1>
  </main>
  <div class="chat-window">
    <div class="chat-messages" bind:this={chatMessagesDiv}>
      {#each $chatMessages as msg}
        <div>
          {#if msg.type === "CHAT:CHATMSG"}
            <span>{msg.timestamp.format("hh:mm")}</span>
            <span>{msg.user}:</span>
            <span>{msg.message}</span>
          {:else if msg.type === "chatclientmessage"}
            <span>{msg.timestamp.format("hh:mm")}</span>
            <span>{msg.message}</span>
          {/if}
        </div>
      {/each}
    </div>
    <div class="chat-input">
      <form on:submit|preventDefault={handleSubmit} bind:this={chatInputForm}>
        <textarea
          bind:value={chatmsg}
          on:keypress={handleEnter}
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
