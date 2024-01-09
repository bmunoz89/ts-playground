// https://www.digitalocean.com/community/tutorials/how-to-debug-node-js-with-the-built-in-debugger-and-chrome-devtools
// Command: node inspect src/debugging/badLoop.js
let orders = [341, 454, 198, 264, 307];

let totalOrders = 0;

// It should be '<', otherwise it returns NaN
for (let i = 0; i <= orders.length; i++) {
  totalOrders += orders[i];
}

console.log(totalOrders);
