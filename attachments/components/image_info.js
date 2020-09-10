import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'
import DeleteButton from './delete_button.js'
import { getCookie } from './cookies.js'

const host = process.env.STORYBOOK ? process.env.API : ''

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.grey[100],
    padding: theme.spacing(2)
  },
  img: {
    maxWidth: '100%',
  },
  button: {
    marginTop: theme.spacing(2)
  }
}))

const ImageInfo = ({img, onDelete}) => {
  const classes = useStyles()
  const [message, setMessage] = useState('已保存')
  const [open, setOpen] = useState(false)
  const [old, setOld] = useState({})
  const [data, setData] = useState({})

  useEffect(()=>{
    if(!img.id) {
      return
    }
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
      'X-CSRFToken': getCookie('csrftoken'),
    }
    //if(process.env.STORYBOOK) {
    //  headers['Authorization'] = 'Basic ' + btoa("chen:mdian1927")
    //}
    fetch(`${host}/api/attachments/${img.id}/`, {
      method: 'patch',
      headers: headers,
      body: JSON.stringify(data)
    }).then(res => res.json()).then(res => {
      setOpen(true)
      setMessage('已保存')
      setOld(data)
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  // 删除
  const handleDelete = () => {
    let headers = {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken'),
    }
    if(process.env.STORYBOOK) {
      headers['Authorization'] = 'Basic ' + btoa("chen:mdian1927")
    }
    fetch(`${host}/api/attachments/${img.id}/`, {
      method: 'delete',
      headers: headers
    }).then(res => {
      setOpen(true)
      setMessage('已删除')
      onDelete(img)
    }).catch(err => console.log(err))
  }

  if(Object.keys(img).length <=0) {
    return null
  }

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        message={message}
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
      <DeleteButton
        onConfirm={handleDelete}
        className={classes.button}
        size="small" />
    </div>
  )
}

export default ImageInfo
