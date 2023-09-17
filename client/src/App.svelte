<script>
  import Login from "./lib/FormEmail.svelte";
  let user = {
    connected: false,
  };
</script>

<main>
  <h1 class="title-main">TAI Retro</h1>
  <div class="container__kanban">
    {#if user.connected}
      <h1>dashboard here</h1>
    {:else}
      <Login />
    {/if}
  </div>
</main>

<style>
  .title-main {
    text-align: center;
  }

  .container__kanban {
    display: flex;
    max-width: 1400px;
    margin: 0 auto;
  }
</style>
