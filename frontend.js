// Minimal genlayer-js client for the TaskReward contract.
//
// The previous version of this file called a `connect()` function that does
// not exist in genlayer-js, and invoked contract methods as if they were
// local JS methods. The real SDK is client-based: you create a client bound
// to a chain and an account, then use readContract / writeContract.

import { createClient, createAccount } from "genlayer-js";
import { studionet } from "genlayer-js/chains";

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS; // set after deployment

const account = createAccount(); // or createAccount(privateKey)
const client = createClient({ chain: studionet, account });

// --- Writes: these are transactions, and they take time to reach consensus ---

export async function createTask(description, criteria, reward) {
  const hash = await client.writeContract({
    address: CONTRACT_ADDRESS,
    functionName: "create_task",
    args: [description, criteria, reward],
    value: 0n,
  });
  return client.waitForTransactionReceipt({ hash, status: "FINALIZED" });
}

export async function claimTask(taskId) {
  const hash = await client.writeContract({
    address: CONTRACT_ADDRESS,
    functionName: "claim_task",
    args: [taskId],
    value: 0n,
  });
  return client.waitForTransactionReceipt({ hash, status: "FINALIZED" });
}

export async function submitEvidence(taskId, evidenceUrl) {
  const hash = await client.writeContract({
    address: CONTRACT_ADDRESS,
    functionName: "submit_evidence",
    args: [taskId, evidenceUrl],
    value: 0n,
  });
  return client.waitForTransactionReceipt({ hash, status: "FINALIZED" });
}

// This is the slow one. It fetches a web page and runs an LLM on every
// validator, so expect it to take far longer than the deterministic calls.
// The receipt is worth logging in full — it is where you can see each
// validator's vote.
export async function verifyAndReward(taskId) {
  const hash = await client.writeContract({
    address: CONTRACT_ADDRESS,
    functionName: "verify_and_reward",
    args: [taskId],
    value: 0n,
  });
  const receipt = await client.waitForTransactionReceipt({
    hash,
    status: "FINALIZED",
  });
  console.log("consensus receipt:", JSON.stringify(receipt, null, 2));
  return receipt;
}

// --- Reads: free, instant, no transaction ------------------------------------

export async function getTask(taskId) {
  return client.readContract({
    address: CONTRACT_ADDRESS,
    functionName: "get_task",
    args: [taskId],
  });
}

export async function getPoints(address) {
  return client.readContract({
    address: CONTRACT_ADDRESS,
    functionName: "get_points",
    args: [address],
  });
}
