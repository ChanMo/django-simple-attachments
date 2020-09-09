import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CheckIcon from '@material-ui/icons/Check';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: 160,
    height: 160,
    border: props => props.active ? '4px solid #00b894' : 'none',
    boxSizing: 'border-box',
  },
  icon: {
    position: 'absolute',
    top: -3,
    right: -3,
  }
}))

const host = process.env.STORYBOOK ? process.env.API : ''

/**
 * 单个图片容器
 */
const ImageBox = (props) => {
  const {image, onChoice, active=false, selected=false} = props
  const classes = useStyles(props)

  return (
    <Card>
      <CardActionArea onClick={()=>onChoice(image)}>
        <CardMedia
          className={classes.root}
          //style={selected ? {height:150, border:'4px solid #00b894',boxSizing:'border-box'} : {height:150}}
          image={`${host}${image.source}?width=160&height=160`}
          title={image.name}
        />
        {selected && <CheckBoxIcon
          className={classes.icon}
          color="secondary" />}
      </CardActionArea>
    </Card>
  )
}


export default ImageBox
