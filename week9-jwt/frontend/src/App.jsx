import { useEffect, useState } from 'react'
import axios from 'axios'
import ListRed from './ListRen'

function App() {
  const [count, setCount] = useState(0)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')


  const loginClick = () => {
    // setToken('token')
    axios.post('http://localhost:3000/users/login', {
      username, password
    }).then((res) => {
      const token = res.data.token
      setToken(token)
      localStorage.setItem('token', token)
    }).catch((err) => { alert('login fail') })
      .finally(() => {
        setUsername('')
        setPassword('')
      })
  }


  return (
    <main className="antialiased bg-gray-950 text-white">
      <section className='max-w-lg grid items-center h-dvh mx-auto p-2'>
        <div className="">
          {token ? (
            <>
              <div className="my-5">
                <div className="text-5xl font-bold ">
                  logged
                  <span className="text-violet-300">in</span>
                </div>
              </div>
              <div>status: have <span className='text-green-400'>token</span></div>
              <ListRed setToken={setToken} />
            </>
          ) : (
            <>
              <div className="mt-5 mb-10">
                <div className="text-5xl font-bold ">
                  login
                  <span className="text-blue-300">jwt</span>
                </div>
              </div>
              <div className='grid gap-3'>
                <span className='text-lg'>Username</span>
                <input type="text"
                  className="border p-2 rounded-sm border-gray-400"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                />
                <span className='text-lg'>Password</span>
                <input type="password"
                  className='border p-2 rounded-sm border-gray-400'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                />
                <button
                  className='mt-5 p-3 rounded-sm bg-red-500'
                  onClick={() => loginClick()}
                >Login</button>
              </div>
            </>
          )}
        </div>
      </section >
    </main>
  )
}

export default App


