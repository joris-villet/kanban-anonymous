<script>
  import { store } from "../store";
  export let placeholder = "";
  let value = "";

  const unsubscribe = store.payload.value.subscribe((val) => {
    value = val;
  });
</script>

<div>
  <label>
    <input bind:value type="text" {placeholder} />
  </label>
</div>
