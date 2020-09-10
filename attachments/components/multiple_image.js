import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { makeStyles } from '@material-ui/core/styles'
import PickerBox from './picker_box'
import SortableGrid from './sortable_grid'

const host = process.env.STORYBOOK ? process.env.API : ''

const useStyles = makeStyles({
  help: {
    color: 'grey',
    fontSize: '95%',
    marginLeft: 0,
    marginBottom: 8,
    paddingLeft: 0
  }
})

const MultipleImage = (props) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(props.value ? props.value.split(',') : [])
  const [tmp, setTmp] = useState(props.value ? props.value.split(',') : [])
  const [hover, setHover] = useState(null)
  const classes = useStyles()

  const handleChoice = (img) => {
    if(typeof(img) === 'object') {
      const res = [...tmp, ...img]
      setTmp(res)
      setValue(res)
      setOpen(false)
    } else {
      if(tmp.indexOf(img) > -1) {
        setTmp(tmp.filter(i => i !== img))
      } else {
        setTmp([...tmp, img])
      }
    }
  }

  const handleSubmit = () => {
    setValue(tmp)
    setOpen(false)
  }

  const handleRemove = (img) => {
    const res = tmp.filter(i => i !== img)
    setTmp(res)
    setValue(res)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = (img) => {
    if(tmp.indexOf(img) > -1) {
      setTmp(tmp.filter(i => i !== img))
    }
    if(value.indexOf(img) > -1) {
      setValue(value.filter(i => i !== img))
    }
  }

  return (
    <React.Fragment>
      <SortableGrid
        images={value}
        onChange={setValue}
        onRemove={handleRemove}
      />
      {value.length > 0 && (
        <div className={classes.help}>拖动图片进行排序</div>
      )}
      <Button
        onClick={()=>setOpen(true)}
        variant="contained"
        size="small">选择图片</Button>
      <textarea
        style={{display:"none"}}
        name={props.name}
        value={value.join(',')}
        onChange={()=>null}
      />
      <PickerBox
        open={open}
        onSubmit={handleSubmit}
        onClose={handleClose}
        onChoice={handleChoice}
        onDelete={handleDelete}
        tmp={tmp}
        multiple
      />
    </React.Fragment>
  )
}

document.querySelectorAll('.multiple_image_field')
  .forEach(ele => {
    ReactDOM.render(<MultipleImage {...ele.dataset} />, ele)
  })

export default MultipleImage
