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

function createNewLabel() {
  const input = document.getElementById("newLabel");
  const labelName = input.value.trim();
  if (labelName !== "") {
    const label = document.createElement("div");
    label.className = "todo";
    label.className = "label";
    label.textContent = labelName;
    document.getElementById("todo").appendChild(label);
    input.value = "";
  }
}

// cards.forEach((card) => console.log(card.textContent));

async function handleDrop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const columnId = event.target.className.split(" ").at(0);

  //console.log(event.target.className.split(" ").at(0));

  const payload = {
    task: data,
    column: columnId,
  };

  //console.log(payload);

  const res = await superagent
    .post("http://localhost:5000/card")
    .send(payload)
    .set("accept", "json");
  console.log(res.body);
}
