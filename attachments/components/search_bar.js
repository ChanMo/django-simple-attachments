import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1)
  },
  input: {
    marginRight: theme.spacing(1)
  }
}))

const SearchBar = ({value, onSubmit}) => {
  const [data, setData] = useState('')
  const classes = useStyles()

  useEffect(()=>{
    setData(value)
  }, [value])

  const handleChange = (e) => {
    setData(e.target.value)
  }

  return (
    <div className={classes.root}>
      <TextField
        variant="outlined"
        placeholder="请输入标签或名称进行搜索"
        type="search"
        size="small"
        className={classes.input}
        onChange={handleChange}
        value={data}
      />
      <Button
        color="primary"
        variant="contained"
        onClick={()=>onSubmit(data)}
      >搜索</Button>
    </div>
  )
}

export default SearchBar
