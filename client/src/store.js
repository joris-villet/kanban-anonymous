import { writable } from "svelte/store";

export let store = {
  emailChecked: writable(false),
  payload: {
    value: writable(""),
  },
};
