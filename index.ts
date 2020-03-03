// Import stylesheets
import "./style.css";

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById("app");
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

function uuidv4() {
  console.log("uu4");
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function test1(a, b) {
  alert(a);
  alert(b);
}

window["uuidv4"] = uuidv4;
window["test1"] = test1;
window["pageUuid"] = uuidv4();
function receiveMessage(event) {
  if (event.origin !== window.location.origin) return;
  if (event.data && event.data.token !== window["pageUuid"]) return;
  if (
    event.data.operationType &&
    event.data.operationType === "ExecuteFunction"
  ) {
    try {
      if (event.data.functionName) {
        if (event.data.args) {
          window[event.data.functionName](...event.data.args);
        } else {
          window[event.data.functionName]();
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}
window.addEventListener("message", receiveMessage, false);

/*
In the popup's scripts

let postData = {
  token: '2d9ec2ca-1064-424b-aaad-6bd420c599e1',
  operationType: 'ExecuteFunction',
  functionName: 'test1',
  args: ['a123', 'b456', 'c789']
};
postMessage(postData, location.origin)

 */