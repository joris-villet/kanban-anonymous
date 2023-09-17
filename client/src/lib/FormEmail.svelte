<script>
  import ky from "ky";
  import { store } from "../store";
  import Input from "./Input.svelte";

  let email = "";

  store.payload.value.subscribe((val) => {
    email = val;
  });

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

<Input placeholder="email" />
