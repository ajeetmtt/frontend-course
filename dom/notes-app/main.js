const inputBox = document.querySelector(".input");
const addBtn = document.querySelector(".addBtn");
const errorMessageText = document.querySelector(".error-message-text");
const noteWrapper = document.querySelector(".notes-list-wrapper");

const generateId = () => "_" + Math.random().toString(36).substr(2, 9);
let isEdit = false;
let editId = null;
const createElement = (noteObj) => {
  const li = document.createElement("li");
  li.dataset.id = noteObj.id;
  const p = document.createElement("p");
  p.textContent = noteObj.text;
  const editBtn = document.createElement("button");

  editBtn.textContent = "Edit";
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.style.marginRight = "10px";
  checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
      p.style.textDecoration = "line-through";

      editBtn.disabled = true;
      editBtn.style.opacity = "0.5";
      editBtn.style.cursor = "not-allowed";
    } else {
      p.style.textDecoration = "none";
      editBtn.disabled = false;
      editBtn.style.opacity = "1";
      editBtn.style.cursor = "pointer";
    }
  });
  li.appendChild(checkBox);
  li.appendChild(p);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    const confirm = window.confirm("Are you sure you want to delete");
    if (!confirm) return;
    li.remove();

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter((note) => note.id !== noteObj.id);
    localStorage.setItem("notes", JSON.stringify(notes));
  });

  editBtn.addEventListener("click", () => {
    inputBox.value = li.querySelector("p").textContent;
    isEdit = true;
    editId = noteObj.id;
    addBtn.textContent = "Update";
    errorMessageText.textContent = "";
  });

  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  return li;
};

const addOrUpdateNote = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    errorMessageText.textContent = "please write something in input box";
    return;
  }
  let notes = JSON.parse(localStorage.getItem("notes"));
  if (isEdit && editId) {
    //update exist note
    notes = notes.map((note) =>
      note.id === editId ? { ...note, text: inputText } : note
    );
    localStorage.setItem("notes", JSON.stringify(notes));

    //update dom
    const liElement = document.querySelector(`li[data-id="${editId}"]`);
    liElement.querySelector("p").textContent = inputText;
    //reset
    editId = null;
    isEdit = false;
    addBtn.textContent = "Add";
  } else {
    let noteObj = {
      id: generateId(),
      text: inputText,
    };
    const liElement = createElement(noteObj);
    notes.push(noteObj);
    localStorage.setItem("notes", JSON.stringify(notes));
    noteWrapper.appendChild(liElement);
  }
  inputBox.value = "";
  errorMessageText.textContent = "";
};

const loadNotes = () => {
  const notes = JSON.parse(localStorage.getItem("notes"));
  notes.forEach((note) => {
    const newLiElement = createElement(note);
    noteWrapper.appendChild(newLiElement);
  });
};

addBtn.addEventListener("click", addOrUpdateNote);
window.addEventListener("DOMContentLoaded", loadNotes);
