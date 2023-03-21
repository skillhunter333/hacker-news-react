import { useState, useEffect } from "react";
import {format} from "date-fns";
import { ToastContainer, Toast, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [text, setText] = useState("");
  const [largeTitle, setLargeTitle] = useState([]);
  const[isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const getArticals = async() => {
      const response = await fetch(`http://hn.algolia.com/api/v1/search?query=${query}`)
      const data = await response.json() 
      console.log(data)
      setItems(data.hits)
      setLargeTitle(data.hits[0])

    }
    getArticals()
    setIsLoading(false);
  }, [query])


  const handleSubmit = (e) => {
    e.preventDefault()

    if(!text) {
      toast.error('☝️ Search bar is Empty!', {
        
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
    else {
      setQuery(text)
      setText('')

    }
  }

  return (
    <>
<section className="section">
  <form autoComplete="off" onSubmit={handleSubmit}>
    <input 
      type='text' 
      name="search" 
      id="search" 
      value={text}
      onChange={(e) => setText(e.target.value)} 
      placeholder="Search for something">

    </input>
      <button>Search</button>
  </form>

    <ToastContainer position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
/>

    {isLoading ? <div className="spinner"></div>+1000 : <>
    <article className="title">
      <h1>{largeTitle.title}</h1>
      <a href={largeTitle.url} target="_blank" rel="noreffer">Read full artical</a>
    </article>

      <p className="cat">Category: <span>{query}</span></p>
      <article className="cards">
        

       {items.map(({author, created_at, title, url, objectId})=>(
        <div key={objectId}>
          <h2>{title}</h2>
          <ul>
            <li>by {author}</li>
            <li><a href={url} target="_blank" rel="noreffer">Read Artical</a></li>
          </ul>
          <p>{format(new Date(created_at), 'MMMM dd yyyy')}</p>
        </div>
       ))}
        
      </article></>}
      
</section>

    </>
  );
}

export default App;
