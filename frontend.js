import { connect } from "genlayer-js";

async function main() {
  const contract = await connect("TaskContract");

  await contract.create_task("User1", "Design a logo", 50);

  await contract.complete_task(0, "User2");

  const result = await contract.reward_worker(0);
  console.log(result);
}

main();
