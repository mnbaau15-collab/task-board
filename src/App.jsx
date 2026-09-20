import { useEffect, useState } from 'react'

const STORAGE_KEY = 'tasks'

const loadTasks = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [text, setText] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (e) => {
    e.preventDefault()
    const title = text.trim()
    if (!title) return
    setTasks([...tasks, { id: crypto.randomUUID(), title, done: false }])
    setText('')
  }

  const toggleTask = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id))

  return (
    <main className="app">
      <h1>Task Board</h1>
      <form className="add-form" onSubmit={addTask}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="新しいタスクを入力"
        />
        <button type="submit">追加</button>
      </form>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.done ? 'task done' : 'task'}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span>{task.title}</span>
            </label>
            <button
              type="button"
              className="delete"
              onClick={() => deleteTask(task.id)}
              aria-label={`${task.title}を削除`}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
      {tasks.length === 0 && <p className="empty">タスクはまだありません</p>}
    </main>
  )
}
