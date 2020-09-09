import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { getCookie } from './cookies.js'

const host = process.env.STORYBOOK ? process.env.API : ''

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2)
  },
  tag: {
    marginRight: theme.spacing(1)
  }
}))

/**
 * 热门标签
 */
const TagsBar = ({onSubmit}) => {
  const classes = useStyles()
  const [data, setData] = useState([])
  const [active, setActive] = useState(null)

  useEffect(()=>{
    let headers = {}
    if(process.env.STORYBOOK) {
      headers['Authorization'] = 'Basic ' + btoa("chen:mdian1927")
    }

    fetch(host+'/api/attachments/tags/', {
      headers: headers
    })
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.log(err))
  }, [])

  const handleClick = (e) => {
    setActive(e.target.innerHTML)
    onSubmit(e.target.innerHTML)
  }

  const handleReset = () => {
    setActive(null)
    onSubmit('')
  }

  return (
    <div className={classes.root}>
      <Button
        className={classes.tag}
        color={active ? "default" : "secondary"}
        size="small"
        onClick={handleReset}
      >全部</Button>
      {data.map(item => (
        <Button
          className={classes.tag}
          color={active === item.tag__name ? "secondary" : "default"}
          size="small"
          onClick={handleClick}
          key={item.tag__name}>{item.tag__name}</Button>
      ))}
    </div>
  )
}

export default TagsBar
