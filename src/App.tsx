import { useState, useEffect, FormEvent } from "react"
import * as SC from "./App.styles"
import * as Photos from "./services/photo"
import { Photo } from "./types/Photo"
import { PhotoItem } from "./components/PhotoItem"
const App = () => {
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [removing, setRemoving] = useState(false)
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true)
      setPhotos(await Photos.getAll())
      setLoading(false)
    }
    getPhotos()
  }, [])
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement> ) => {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)
      const file = formData.get('image') as File

      if(file && file.size > 0){
        setUploading(true)
        let result = await Photos.insert(file)
        setUploading(false)

        if(result instanceof Error){
          alert(`${result.name} - ${result.message}`)
        } else {
          let newPhotoList = [...photos]
          newPhotoList.push(result)
          setPhotos(newPhotoList)
        }
      }
  }

  const handleDelete = async (name:string) => {
    setRemoving(true)
    let deletePhotos = await Photos.deleteImg(name)
    let remainingImages = await Photos.getAll()
    setRemoving(false)
    setPhotos(remainingImages)    
  }
  return(
    <SC.Container>
      <SC.Area>
        <SC.Header>Photo Gallery</SC.Header>

        <SC.UploadForm 
        method="POST" 
        onSubmit={handleFormSubmit}>
          <input type="file" name="image" />
          <input type="submit" value="Enviar" />
          {uploading && 'Sending...'}
        </SC.UploadForm>


        {loading && 
        <SC.ScreenWarning>
          <div>Loading...</div>
          </SC.ScreenWarning>}

          {!loading && photos.length > 0 &&
          <SC.PhotoList>
            {photos.map((photo, i) => (
              <PhotoItem 
              key={i}
              url={photo.url}
              name={photo.name}
              deleteItem={handleDelete}
              removing={removing}
              />
            ))}
            </SC.PhotoList>}

            {!loading && photos.length === 0 && 
            <SC.ScreenWarning>
            <div>Add photos to see them here!.</div>
            </SC.ScreenWarning>}
      </SC.Area>
    </SC.Container>
  )
}
export default App