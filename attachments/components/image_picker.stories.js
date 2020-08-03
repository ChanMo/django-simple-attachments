import React from 'react'
import ImagePicker from './image_picker'
import MultipleImage  from './multiple_image'
import UploadBox from './upload_box'
import ImageGrid from './image_grid'
import PickerBox from './picker_box'
import SortableGrid from './sortable_grid'

export default { title: 'ImagePicker' }
export const base = () => (
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
  <ImageGrid />
)


