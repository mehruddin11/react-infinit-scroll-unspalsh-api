import {useState, useEffect, useCallback} from 'react';
import Photos from './photos';
import {FaSearch} from 'react-icons/fa';
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;
const AcessId = `?client_id=${process.env.REACT_APP_ACCESS_KEY }`
function App() {
  const [loading, setLoading] = useState(false);
  const [photo , setPhoto] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const fethPhoto = useCallback(async() =>{
    setLoading(true)
    let url;
    const  urlpages = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    if(query){
      url= `${searchUrl}${AcessId}${urlpages}${urlQuery}`
    }else{

    url = `${mainUrl}${AcessId}${urlpages}`
    }
    try{
      const response = await fetch(url)
      const data = await response.json();
      console.log(data);
      setLoading(false)
        setPhoto((oldphoto)=>{
          if(query && page === 1){
            return data.results;
          }
          else if(query){
            return [...oldphoto, ...data.results]
          }else{

          return [...oldphoto, ...data];
          }
      });

    }catch(err){
      console.log(err);
      setLoading(false);
    }
},[page,query]);
useEffect(()=>{
  return fethPhoto();
},[fethPhoto]);
const handlesubmit = (e)=>{
  e.preventDefault();
  fethPhoto();
}
useEffect(()=>{
  const scrollDown = window.addEventListener('scroll', () =>{
      if((!loading && window.innerHeight+ window.scrollY)>= 
          document.body.scrollHeight-2)
      {
        setPage((oldpage)=>{
          return oldpage+1;
        })
      }
    })
      return window.removeEventListener('scroll', scrollDown);
},[loading])
  return(
    <main>
    <div className ='search'>
    <form className='search-form'>
    <input type = "text" className='form-input' value ={query} onChange = {(e)=> setQuery(e.target.value)} />
    <button type ="submit" className='submit-btn'
      onClick= {handlesubmit}><FaSearch/></button>
    </form>
    </div>
    <div className='photos-center top_margin'>
    {
      photo.map((images)=>{
        console.log(images)
        return <Photos key ={images.id} {...images}/>
      })
    }
    </div>
    <div className='loading'>{!loading&&<h3>Loading...</h3>}</div>
    </main>
  );
}
export default App;
