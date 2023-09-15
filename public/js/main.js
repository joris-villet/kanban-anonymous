new Sortable(document.getElementById("todo"), {
  group: "kanban",
  animation: 150,
});

new Sortable(document.getElementById("in-progress"), {
  group: "kanban",
  animation: 150,
});

new Sortable(document.getElementById("done"), {
  group: "kanban",
  animation: 150,
});
