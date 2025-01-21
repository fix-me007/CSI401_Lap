import { useState } from 'react'
import axios from 'axios'

import './App.css'

function App() {

  const [a, setA] = useState('0')
  const [b, setB] = useState('0')
  const [c, setC] = useState('0')


  const aAddB = async () => {

    // axios.post()

    axios.post('http://localhost:3000/aAddB', {
      a: parseFloat(a), b: parseFloat(b)
    })
      .then(function (response) {
        console.log(response);
        setC(response.data.result)
      })
      .catch(function (error) {
        console.log(error);
      });

    // fetch()
    // try {
    //   const response = await fetch('http://localhost:3000/aAddB', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       a: parseFloat(a), b: parseFloat(b)
    //     })
    //   })
    //   if (response.ok) {
    //     const data = await response.json()
    //     console.log(data);
    //     setC(data)
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

  }

  const a2AddB2 = () => {
    axios.post('http://localhost:3000/a2AddB2', {
      a: parseFloat(a), b: parseFloat(b)
    })
      .then(function (response) {
        console.log(response);
        setC(response.data.result)
      })
      .catch(function (error) {
        console.log(error);
      });
    // setC(aNum ** 2 + bNum ** 2)
  }

  const aPowB = () => {

    axios.post('http://localhost:3000/aPowB', {
      a: parseFloat(a), b: parseFloat(b)
    })
      .then(function (response) {
        console.log(response);
        setC(response.data.result)
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const aMulB = () => {
    axios.post('http://localhost:3000/aMulB', {
      a: parseFloat(a), b: parseFloat(b)
    })
      .then(function (response) {
        console.log(response);
        setC(response.data.result)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const aAddBThenPower3 = async () => {

    try {
      const res1 = await axios.post('http://localhost:3000/aAddB', {
        a: parseFloat(a), b: parseFloat(b)
      })

      console.log("from res1 a + b = ", res1.data.result);

      const res2 = await axios.post('http://localhost:3000/aPowB', {
        a: res1.data.result, b: 3
      })

      setC(res2.data.result)

      console.log("a :", a, "b :", b, "final result => c :", c);

    } catch (error) {
      console.log(error)
    }

  }

  const thisisbestfuc = async () => {

    try {

      const res1 = await axios.post('http://localhost:3000/aPowB', {
        a: parseFloat(a), b: 2
      })

      console.log("res 1 a^2 => ", res1.data.result);

      const res2 = await axios.post('http://localhost:3000/aMulB', {
        a: parseFloat(a), b: parseFloat(b)
      })

      console.log("res 2 axb => ", res2.data.result);

      const res3 = await axios.post('http://localhost:3000/aMulB', {
        a: 2, b: res2.data.result
      })

      console.log("res 3 : 2 x b(res2) => ", res3.data.result);

      const res4 = await axios.post('http://localhost:3000/aPowB', {
        a: parseFloat(b), b: 2
      })

      console.log("res 4 b^2 => ", res4.data.result);

      const res5 = await axios.post('http://localhost:3000/aAddB', {
        a: res1.data.result, b: res3.data.result
      })

      console.log("res 5 res1 + res3 =>", res5.data.result);

      const res6 = await axios.post('http://localhost:3000/aAddB', {
        a: res5.data.result, b: res4.data.result
      })

      console.log("res 6 res5 + res4 =>", res6.data.result);

      setC(res6.data.result)

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <main>
      <div>
        <h1>Math by rawi</h1>
        <section className='input_container'>
          <div className='input_box'>
            <span>Enter a</span>
            <input type="number" value={a} onChange={(e) => setA(e.target.value)} />
          </div>
          <div className='input_box'>
            <span>Enter b</span>
            <input type="number" value={b} onChange={(e) => setB(e.target.value)} />
          </div>
        </section>
        <section className=''>
          <h1>Cala with btn</h1>
          <div className='btn_box'>
            <button onClick={aAddB}>c=a+b</button>
            <button onClick={a2AddB2}>c=a<sup>2</sup>+b<sup>2</sup></button>
            <button onClick={aPowB}>c=a<sup>b</sup></button>
          </div>
          <hr />
          <div className="btn_box">
            <button onClick={aMulB} id='Mul_btn'>c=a*b</button>
            <button onClick={aAddBThenPower3} id='Red_btn'>c=(a+b)<sup>3</sup> </button>
            <button onClick={thisisbestfuc} id='Red_btn'>c=a<sup>2</sup>+ 2ab + b<sup>2</sup></button>
          </div>
        </section>
        <section className='input_container'>
          <h1>
            Display result
          </h1>
          <div className='input_box'>
            <span>c</span>
            <span>=</span>
            <input className="input_text" type="text" disabled={true} value={c} onChange={(e) => setC(e.target.value)} />
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
