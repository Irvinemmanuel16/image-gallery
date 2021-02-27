import React, { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard'
import ImageSearch from './components/ImageSearch'


function App() {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [term, setTerm] = useState('')

  const fetchData = async () => {
    setIsLoading(true)
    try {
      let response = await fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
      let data = await response.json()
      setImages(data.hits);
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [term])

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />
      {!isLoading && images.length === 0 && <h1 className='text-5xl text-center py-4 mx-auto'>No images were found</h1> }
      {isLoading ? <h1 className='text-6xl text-center mx-auto py-4'>...Loading</h1> : <div className="grid grid-cols-3 gap-4">
        {
          images && images.map(image => <ImageCard key={image.id} image={image}/>)
        }
      </div>}
    </div>
  );
}

export default App;
