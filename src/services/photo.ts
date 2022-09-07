import { Photo } from "../types/Photo"
import { storage } from "../libs/firebase"
import { ref, listAll,getDownloadURL, uploadBytes, deleteObject } from "firebase/storage"
import { v4 as createId } from "uuid"

export const getAll = async () => {
    let list: Photo[] = []

    // referenciado a pasta de imagens:
    const imagesFolder = ref(storage,"images")
    // listando todas as imagens 
    const photoList = await listAll(imagesFolder)
    
    // fazendo um for nos items para inserir no array
    for(let i in photoList.items){
        // gerando a url:
        let photoUrl = await getDownloadURL(photoList.items[i])
        list.push({ name: photoList.items[i].name, url: photoUrl })
    }
    return list
}

export const insert = async (file: File) => {
    if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        let randomName = createId()
        let newFile = ref(storage, `images/${randomName}`)

        let upload = await uploadBytes(newFile, file)
        let photourl = await getDownloadURL(upload.ref)
        return {
            name: upload.ref.name,
            url: photourl
        } as Photo
    } else {
        return new Error('File type not allowed')
    }
}

export const deleteImg = async (name: String) => {
    const imagesFolder = ref(storage, 'images')
    const allImages = await listAll(imagesFolder)
    for(let i in allImages.items) {
        if(allImages.items[i].name === name){
            let actualImg = allImages.items[i]
            const deleteObj = await deleteObject(actualImg)
        }
    }
}