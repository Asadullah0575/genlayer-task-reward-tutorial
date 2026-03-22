import { connect } from "genlayer-js";

async function main() {
  const contract = await connect("TaskContract");

  // Create a task
  await contract.create_task("User1", "Design a logo", 50);

  // Complete the task
  await contract.complete_task(0, "User2");

  // Reward worker
  const result = await contract.reward_worker(0);

  console.log(result);
}

main();
