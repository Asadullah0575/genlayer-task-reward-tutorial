
Replace `YOUR-USERNAME` with your actual GitHub name


# 🧾 2. `contract.py` (Backend logic)

Paste this:

```python
class TaskContract:
    def __init__(self):
        self.tasks = []

    def create_task(self, creator, description, reward):
        self.tasks.append({
            "creator": creator,
            "description": description,
            "reward": reward,
            "completed": False,
            "worker": None
        })
        return "Task created"

    def complete_task(self, task_id, worker):
        self.tasks[task_id]["completed"] = True
        self.tasks[task_id]["worker"] = worker
        return "Task completed"

    def reward_worker(self, task_id):
        task = self.tasks[task_id]
        if task["completed"]:
            return f"Reward sent to {task['worker']}"
        return "Task not completed yet"
