import React from 'react'
import ImagePicker from './image_picker'
import MultipleImage  from './multiple_image'
import UploadBox from './upload_box'
import ImageGrid from './image_grid'
import PickerBox from './picker_box'
import SortableGrid from './sortable_grid'
import TagsBar from './tags_bar.js'
import SearchBar from './search_bar.js'
import ImageInfo from './image_info.js'
import ImageBox from './image_box.js'
import DeleteButton from './delete_button.js'

export default { title: 'Attachments' }

export const imagePicker = () => (
  <div>
    <h3>Image Picker</h3>
    <ImagePicker />
    <h3>Multiple Image Picker</h3>
    <MultipleImage />
  </div>
)

export const sortableGrid = () => (
  <SortableGrid images={['http://pic4.nipic.com/20091011/2799493_105817078292_2.jpg', 'http://pic26.nipic.com/20130121/668573_113232469110_2.jpg', 'http://pic4.nipic.com/20090923/3228343_084632296677_2.jpg', 'https://tse4-mm.cn.bing.net/th/id/OIP.6M1_dCYcfRODlI130JK7pAHaGl?pid=Api&rs=1', 'http://pic30.nipic.com/20130613/8379629_113101477335_2.jpg']} />
)

export const pickerBox = () => (
  <PickerBox open />
)

export const uploadBox = () => (
  <UploadBox />
)

export const imageGrid = () => (
  <ImageGrid onChoice={()=>null} />
)

export const searchBar = () => (
  <SearchBar />
)

export const tagsBar = () => (
  <TagsBar />
)

const img = {
      "id": 9,
      "source": "/media/attachments/f5c3c700-1255-4882-afb4-d72d73fe1550.jpg",
      "name": "hello.jpg",
      "size": 102071,
      "width": 640,
      "height": 797,
      "ftype": null,
      "description": "",
      "is_active": true,
      "created": "2020/09/08 09:38:05",
      "updated": "2020/09/09 01:03:44"

}

export const imageInfo = () => (
  <ImageInfo img={{
      "id": 9,
      "source": "/media/attachments/f5c3c700-1255-4882-afb4-d72d73fe1550.jpg",
      "name": "hello.jpg",
      "size": 102071,
      "width": 640,
      "height": 797,
      "ftype": null,
      "description": "",
      "is_active": true,
      "created": "2020/09/08 09:38:05",
      "updated": "2020/09/09 01:03:44"
  }} />
)

export const imageBox = () => (
  <div style={{display:'flex'}}>
    <ImageBox
      image={img}
      onChoice={()=>null}
    />
    <ImageBox
      image={img}
      active
      onChoice={()=>null}
    />
    <ImageBox
      image={img}
      selected
      onChoice={()=>null}
    />
    <ImageBox
      image={img}
      active
      selected
      onChoice={()=>null}
    />
  </div>
)

export const deleteButton = () => (
  <div>
    <DeleteButton open={true} onClose={()=>null} onConfirm={()=>null} />
  </div>
)
