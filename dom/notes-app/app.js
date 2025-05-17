const inputBox = document.querySelector(".input");
const addBtn = document.querySelector(".addBtn");
const errorMessageText = document.querySelector(".error-message-text");
const notesListWrapper = document.querySelector(".notes-list-wrapper");
let editId = null;
let isEdit = false;
const generteId = () => "_" + Math.random().toString(36).substr(2, 9);
const createElement = (noteObj) => {
  const li = document.createElement("li");
  li.dataset.id = noteObj.id;
  const p = document.createElement("p");
  p.textContent = noteObj.text;
  li.appendChild(p);

  const editBtn = document.createElement("button");
  editBtn.textContent = "edit";
  editBtn.addEventListener("click", () => {
    inputBox.value = li.querySelector("p").textContent;
    addBtn.textContent = "Update";
    editId = noteObj.id;
    isEdit = true;
    errorMessageText.textContent = "";
  });
  li.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "delete";
  deleteBtn.addEventListener("click", () => {
    const confirm = window.confirm("Are you sure want to delete");
    if (!confirm) return;
    li.remove();
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter((note) => note.id !== noteObj.id);
    localStorage.setItem("notes", JSON.stringify(notes));
    errorMessageText.textContent = "";
  });
  li.appendChild(deleteBtn);
  return li;
};

const addorUpdateNotes = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    errorMessageText.textContent = "This filed is required";
    return;
  }

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  if (editId && isEdit) {
    //update note
    notes = notes.map((note) =>
      note.id === editId ? { ...note, text: inputText } : note
    );
    localStorage.setItem("notes", JSON.stringify(notes));

    //update dom

    const existLiElement = document.querySelector(`li[data-id="${editId}"]`);

    existLiElement.querySelector("p").textContent = inputText;

    //reset
    addBtn.textContent = "Add Note ";
    editId = null;
    isEdit = false;
  } else {
    const noteObj = {
      id: generteId(),
      text: inputText,
    };

    notes.push(noteObj);
    localStorage.setItem("notes", JSON.stringify(notes));
    const liElement = createElement(noteObj);
    notesListWrapper.appendChild(liElement);
  }

  inputBox.value = "";
  errorMessageText.textContent = "";
};

const loadNotes = () => {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach((note) => {
    const liElement = createElement(note);
    notesListWrapper.appendChild(liElement);
  });
};

addBtn.addEventListener("click", addorUpdateNotes);
window.addEventListener("DOMContentLoaded", loadNotes);
