export function getLastNumber(url) {
    let end = url.lastIndexOf("/");
    let start = end - 2;
    if (url.charAt(start) === "/") {
      start++;
    }
    return url.slice(start, end);
  }
  
export function removeChildren(container){
  while (mainContent.firstChild) {
    //The list is LIVE so it will reindex each call
    mainContent.removeChild(mainContent.firstChild);
  }}