const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");

document.addEventListener("DOMContentLoaded", loadBookmarks);

addBookmarkBtn.addEventListener("click", function () {
  const name = bookmarkNameInput.value.trim();
  const url = bookmarkUrlInput.value.trim();

  if (!name || !url) {
    alert("Please enter both name and URL.");
    return;
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    alert("Please enter a valid URL starting with heep:// or https://");
    return;
  }

  addBookmark(name, url);
  saveBookmark(name, url);
  bookmarkNameInput.value = "";
  bookmarkUrlInput.value = "";
});

function addBookmark(name, url) {
  const li = document.createElement("li");
  const link = document.createElement("a");
  link.href = url;
  link.textContent = name;
  link.target = "_blank";

  const rmvBtn = document.createElement("button");
  rmvBtn.textContent = "Remove";
  rmvBtn.addEventListener("click", function () {
    bookmarkList.removeChild(li);
    removeBookmark(name, url);
  });

  li.appendChild(link);
  li.appendChild(rmvBtn);

  bookmarkList.appendChild(li);
}

function getBookmarks() {
  const bookmarks = localStorage.getItem("bookmarks");
  return bookmarks ? JSON.parse(bookmarks) : [];
}

function loadBookmarks() {
  const bookmarks = getBookmarks();
  bookmarks.forEach((bookmark) => addBookmark(bookmark.name, bookmark.url));
}

function saveBookmark(name, url) {
  const bookmarks = getBookmarks();
  bookmarks.push({ name, url });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function removeBookmark(name, url) {
  let bookmarks = getBookmarks();
  bookmarks = bookmarks.filter(
    (bookmark) => bookmark.name !== name || bookmark.url !== url,
  );
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}
