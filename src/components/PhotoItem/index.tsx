import * as SC from "./styles"

interface PhotoItemProps {
    name:string
    url:string
    deleteItem: (url:string) => any
    removing?:boolean
}
export const PhotoItem = ({ name, url, deleteItem, removing }: PhotoItemProps) => {
    return(
        <SC.Container>
            <SC.Modal removing={removing}>
            </SC.Modal>
            <img src={url} alt={name} />
            {name}
            <button onClick={_ => deleteItem(name)}>Remove image</button>
        </SC.Container>
    )
}