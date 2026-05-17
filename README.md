# genlayer-task-reward-tutorial
A beginner-friendly tutorial for building a Task Reward dApp on GenLayer.

## What You'll Learn
- The basics of GenLayer
- How Optimistic Democracy Consensus works
- The Equivalence Principle and why it matters
- Writing Python Intelligent Contracts
- Connecting a frontend with genlayer-js

## Key Concepts

### Optimistic Democracy Consensus
When a user marks a task as completed, the system accepts it optimistically — but anyone can challenge it if they think something's off.

### Equivalence Principle
Several validators each simulate the same operation independently. If they all land on the same result, that result gets accepted. It's how the network stays honest without relying on a single source of truth.

## Smart Contract
The contract logic lives in `contract.py`. That's where task creation, completion, and reward distribution are handled.

## Frontend
The frontend code is in `frontend.js`. It uses genlayer-js to talk to the contract — reading state and sending transactions.

## How It Works
1. A user creates a task and attaches a reward
2. Someone else picks it up and marks it complete
3. The network verifies the completion through consensus
4. If everything checks out, the reward goes to the completer

## Setup
```bash
git clone https://github.com/YOUR-USERNAME/genlayer-task-reward-tutorial
cd genlayer-task-reward-tutorial
npm install
npm run dev
```

A few things to check before running: make sure you're on Node 18+, and you'll need a `.env` file with your GenLayer RPC URL. There's a `.env.example` in the repo to get you started.
