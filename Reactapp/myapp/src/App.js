import React, {useState, useEffect} from 'react'
import * as querystring from 'querystring'
// import CSRFToken from './setCSRFtoken';
import axios from 'axios'



function getCookie(name) {
  let cookieValue = null;
  console.log("cookie is :",typeof(document.cookie))
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

export default function App() {
  // BELOW AXIOS REQUEST IS TO AQUIRE THE CSRF TOKEN FROM DJANGO SERVER BY MAKING REQUEST TO THE API HAVING
  //@ensure_csrf_cookie (TO SEND CSRF TOKEN THROUGH RESPONSE HEADER) AND
  // @csrf_exempt (TO AVOID CSRF RESTRICTION INITIALLY)
  useEffect(
  ()=>{
      axios({
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        url: '/api/setcookie/',
        // data: querystring.stringify({"cookie":"give me bro..."})
      });
    }, []
  )
  // const [state, setstate] = useState(0)
  return (
    <div>
      <div>
        <label>a:</label>
        <input name="a"></input>
        <label>b:</label>
        <input name="b"></input>
        <button onClick={add}>Add</button>
      </div>
      <div id="result" style={{padding:"10px"}}>

      </div>
    </div>
  )
}

const add =() =>{
  let a = document.getElementsByName("a")[0].value
  let b = document.getElementsByName("b")[0].value
  console.log(a,b)
  fetch("/api/add/", 
  {body:querystring.stringify({a:a, b:b}),
  headers: {'Content-Type': 'application/x-www-form-urlencoded', 'X-CSRFToken': getCookie("csrftoken")},
  method:"POST",
  credentials: 'include'
})
  .then(res=>res.text())
  .then(res =>display(res))

}

const display = (res)=>{
  document.querySelector("#result").innerHTML="Sum is: " + res
}


