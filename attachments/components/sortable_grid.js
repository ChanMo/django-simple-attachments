import React, { useState, useEffect, forwardRef } from 'react'
import { ReactSortable } from 'react-sortablejs'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'

const host = process.env.STORYBOOK ? process.env.API : ''

const useStyles = makeStyles({
  img: {
    height:180,
    display:'flex',
    flexDirection:'row-reverse',
    alignItems:'flex-start'
  }
})

const GridWraper = forwardRef((props, ref) => (
  <Grid container ref={ref} spacing={2} style={{width:'100%',marginBottom:8}}>
    {props.children}
  </Grid>
))

const SortableGrid = ({images, onChange, onRemove}) => {
  const [data, setData] = useState([])
  const classes = useStyles()

  useEffect(()=>{
    const copy = images.map((row, index) => ({'id':index+1, 'value':row}))
    setData(copy)
  }, [images])

  const handleChange = (res) => {
    setData(res)
    const value = res.map(row => row.value)
    if(value.length > 0 && onChange && value.join(',') !== images.join(',')) {
      onChange(value)
    }
  }

  const image_url = (url) => {
    if(url.match(/^\//)) {
      return `${host}${url}`
    }
    return url
  }

  return (
    <ReactSortable
      tag={GridWraper}
      list={data}
      setList={handleChange}>
      {data.map(row => (
        <Grid key={row.id} item xs={6} sm={4} md={3} lg={2}>
          <Card>
          <CardMedia
            className={classes.img}
            image={image_url(row.value)}
          >
            <IconButton
              onClick={()=>onRemove(row.value)}>
              <HighlightOffIcon color="error" />
            </IconButton>
          </CardMedia>
        </Card>
      </Grid>
    ))}
    </ReactSortable>
  )
}

export default SortableGrid
