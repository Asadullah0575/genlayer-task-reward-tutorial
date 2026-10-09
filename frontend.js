import { createClient, createAccount } from "genlayer-js";
import { studionet } from "genlayer-js/chains";

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const account = createAccount();
const client = createClient({ chain: studionet, account });

async function write(functionName, args) {
  const hash = await client.writeContract({
    address: CONTRACT_ADDRESS,
    functionName,
    args,
    value: 0n,
  });
  return client.waitForTransactionReceipt({ hash, status: "FINALIZED" });
}

function read(functionName, args = []) {
  return client.readContract({ address: CONTRACT_ADDRESS, functionName, args });
}

export const createTask = (description, criteria, reward) =>
  write("create_task", [description, criteria, reward]);

export const claimTask = (taskId) => write("claim_task", [taskId]);

export const submitEvidence = (taskId, evidenceUrl) =>
  write("submit_evidence", [taskId, evidenceUrl]);

export const verifyAndReward = (taskId) => write("verify_and_reward", [taskId]);

export const getTask = (taskId) => read("get_task", [taskId]);

export const getTaskCount = () => read("get_task_count");

export const getPoints = (address) => read("get_points", [address]);