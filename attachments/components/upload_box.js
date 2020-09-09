import React from 'react'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import BackupIcon from '@material-ui/icons/Backup'
import { getCookie } from './cookies.js'

const host = process.env.STORYBOOK ? process.env.API : ''

const UploadBox = ({onChoice, multiple=false}) => {
  const handleUpload = event => {
    let images = []
    let i
    const files = event.target.files
    for (i = 0; i < files.length; i++) {
      const reader = new FileReader()
      reader.onload = function(e) {
        fetch(host+"/api/attachments/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
          },
          mode: 'cors',
          body: JSON.stringify({source:e.target.result})
        }).then(res => res.json()).then(res => {
          if(multiple) {
            images.push(res.source)
            if(i === files.length) {
              onChoice(images)
            }
          } else {
            onChoice(res.source)
          }
        }).catch(err => console.log(err))
      }
      reader.readAsDataURL(files[i])
    }
  }

  return (
    <div>
      <input
        multiple={multiple}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        id="image-picker-upload"
        style={{display:'none'}}
      />
      <label htmlFor="image-picker-upload">
        <ButtonBase
          component="div"
          style={{width:'100%',minHeight:400,alignItems:'center'}}>
          <BackupIcon size="medium" />
          <Typography
            component="span"
            color="textSecondary">点击上传</Typography>
        </ButtonBase>
      </label>
    </div>
  )
}

export default UploadBox
