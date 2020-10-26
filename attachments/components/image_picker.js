import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import PickerBox from './picker_box'

const host = process.env.STORYBOOK ? process.env.API : ''

const useStyles = makeStyles(theme => ({
  submit: {
    marginRight: theme.spacing(1)
  }
}))

const ImagePicker = (props) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [tmp, setTmp] = useState(null)
  const [value, setValue] = useState(props.value ? props.value : '')
  const [mode, setMode] = useState(0)

  const handleChoice = (value) => {
    setOpen(false)
    setValue(value)
    setTmp(value)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    setValue(tmp)
    setOpen(false)
  }

  const handleDelete = (img) => {
    if(img === tmp) {
      setTmp(null)
    }
    if(img === value) {
      setValue('')
    }
  }

  return (
    <React.Fragment>
      {value && <img src={`${host}${value}`} alt='img' style={{maxHeight:220,display:'block',marginBottom:8}} />}
      <Button
        className={classes.submit}
        onClick={()=>setOpen(true)}
        variant="contained"
        size="small">选择图片</Button>
      {value && <Button
        onClick={()=>setValue('')}
        size="small"
        color="secondary">清除选择</Button>}
      <input
        type="hidden"
        name={props.name}
        maxLength="200"
        value={value} />
      <PickerBox
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        onChoice={handleChoice}
        onDelete={handleDelete}
        tmp={tmp}
      />
    </React.Fragment>
  )
}

document.querySelectorAll('.image_picker_field')
  .forEach(ele => {
    ReactDOM.render(<ImagePicker {...ele.dataset} />, ele)
  })

export default ImagePicker
