export function getLastNumber(url) {
  let end = url.lastIndexOf("/");
  let start = end - 2;
  if (url.charAt(start) === "/") {
    start++;
  }
  return url.slice(start, end);
}

export function removeChildren(container) {
  while (container.firstChild) {
    //The list is LIVE so it will reindex each call
    container.removeChild(container.firstChild);
  }
}
