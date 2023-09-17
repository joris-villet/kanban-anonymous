<script>
  import { store } from "../store";
  import FormEmail from "./FormEmail.svelte";
  import FormNewPassword from "./FormNewPassword.svelte";

  let emailChecked;
  let email = "";

  store.subscribe((el) => {
    email = el.payload.email;
    emailChecked = el.emailChecked;
  });

  // store.emailChecked.subscribe((val) => {
  //   emailChecked = val;
  // });

  // store.payload.value.subscribe((val) => {
  //   email = val;
  // });

  async function handleLogin() {
    console.log(email);
    // const res = await ky
    //   .post("http://localhost:5000/login/email", {
    //     json: { email: email },
    //   })
    //   .json();
    // console.log(res);
  }
</script>

<form>
  <!-- <FormEmail /> -->
  <!-- {#if emailChecked}
    <FormNewPassword />
  {/if} -->
  <div>
    <button on:click|preventDefault={handleLogin}>valider</button>
  </div>
</form>
