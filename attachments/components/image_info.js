import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'
import { getCookie } from './cookies.js'

const host = process.env.STORYBOOK ? process.env.API : ''

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.grey[100],
    padding: theme.spacing(2)
  },
  img: {
    maxWidth: '100%',
  }
}))

const ImageInfo = ({img}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [old, setOld] = useState({})
  const [data, setData] = useState({})

  useEffect(()=>{
    let headers = {
      'X-CSRFToken': getCookie('csrftoken'),
    }
    if(process.env.STORYBOOK) {
      headers['Authorization'] = 'Basic ' + btoa("chen:mdian1927")
    }

    fetch(`${host}/api/attachments/${img.id}/`, {
      headers: headers
    }).then(res => res.json()).then(res => {
      const ress = {
        name: res.name,
        description: res.description,
        tags: res.tags
      }
      setData(ress)
      setOld(ress)
    })
  }, [img])

  const handleChange = (e) => {
    setData({...data, [e.target.name]:e.target.value})
  }

  const handleSubmit = () => {
    if(data === old) {
      // 判断是否需要更新
      return
    }
    let headers = {
        'Content-Type': 'application/json',
    }
    if(process.env.STORYBOOK) {
      headers['Authorization'] = 'Basic ' + btoa("chen:mdian1927")
    }
    fetch(`${host}/api/attachments/${img.id}/`, {
      method: 'patch',
      headers: headers,
      body: JSON.stringify(data)
    }).then(res => res.json()).then(res => {
      setOpen(true)
      setOld(data)
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  if(Object.keys(img).length <=0) {
    return null
  }

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        message="已保存"
        onClose={()=>setOpen(false)}
        autoHideDuration={2000}
      />
      <Typography
        variant="h6"
        component="h5"
        gutterBottom>附件详情</Typography>
      <img
        className={classes.img}
        src={host+img.source} />
      <Typography variant="body2" color="textSecondary">
        {img.created}
        <br />
        {img.width}x{img.height}像素
        <br />
        {img.size}KB
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="标题"
        value={data.name ? data.name : ''}
        name="name"
        onChange={handleChange}
        onBlur={handleSubmit}
      />
      <TextField
        fullWidth
        margin="normal"
        multiline
        rows={4}
        label="图像描述"
        value={data.description ? data.description : ''}
        name="description"
        onChange={handleChange}
        onBlur={handleSubmit}
      />
      <TextField
        fullWidth
        margin="normal"
        disabled
        label="文件URL"
        value={img.source}
      />
      <TextField
        fullWidth
        margin="normal"
        label="标签"
        value={data.tags ? data.tags : ''}
        name="tags"
        onChange={handleChange}
        onBlur={handleSubmit}
        helperText={'使用英文逗号分割多个标签'}
      />
    </div>
  )
}

export default ImageInfo
