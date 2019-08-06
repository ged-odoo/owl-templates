export { makeTestEnv } from "./testEnv.js";

export function nextTick() {
  return new Promise(resolve => setTimeout(resolve));
}

export function makeTestFixture() {
  let fixture = document.createElement("div");
  document.body.appendChild(fixture);
  return fixture;
}

export async function editInput(input, value) {
  input.value = value;
  input.dispatchEvent(new Event("input"));
  input.dispatchEvent(new Event("change"));
  return nextTick();
}
