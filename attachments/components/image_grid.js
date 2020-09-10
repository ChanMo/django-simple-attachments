import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TablePagination from '@material-ui/core/TablePagination'
import { makeStyles } from '@material-ui/core/styles'
import SearchBar from './search_bar.js'
import TagsBar from './tags_bar.js'
import ImageInfo from './image_info.js'
import ImageBox from './image_box.js'

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    display: 'flex',
    overflowY: 'hidden',
    height: '100%'
  },
  grid: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },
  item: {
    padding: theme.spacing(1/2)
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'hidden',
  },
  info: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    width: 320,
    maxWidth: 320,
    height: '100%',
    overflowY: 'scroll',
  }
}))

const host = process.env.STORYBOOK ? process.env.API : ''

const ImageGrid = ({onChoice, onDelete, values=''}) => {
  const classes = useStyles()
  const [data, setData] = useState({count:0, results:[]})
  const [active, setActive] = useState({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const limit = 50

  useEffect(()=>{
    const fetchData = async() => {
      const offset = page * limit
      try {
        let options = {}
        if(process.env.STORYBOOK) {
          options = {
            headers: {
              'Authorization': 'Basic ' + btoa("chen:mdian1927")
            }
          }
        }
        const res = await fetch(`${host}/api/attachments/?limit=${limit}&offset=${offset}&search=${search}`, options)
        const resJson = await res.json()
        setData(resJson)
      } catch {
        console.log('fetch images error')
      }
    }
    fetchData()
  }, [page, search])

  const handleChoice = (img) => {
    setActive(img)
    onChoice(img.source)
  }

  // 判断是否选中状态
  const checkSelected = (src) => {
    if(typeof(values) === 'object' && values !== null) {
      return values.indexOf(src) > -1
    }
    return false
  }

  const handleDelete = (img) => {
    setData({...data, results:data.results.filter(i=>i.id !== img.id)})
    setActive({})
    onDelete(img.source)
  }

  return (
      <div className={classes.root}>
        <div className={classes.main}>
          <SearchBar
            value={search}
            onSubmit={(value)=>setSearch(value)}
          />
          <TagsBar
            onSubmit={(value)=>setSearch(value)}
          />
          {data.results.length > 0 ? (
            <>
              <div className={classes.grid}>
                {data.results.map(row => (
                  <div
                    className={classes.item}
                    key={row.id}>
                  <ImageBox
                    selected={checkSelected(row.source)}
                    active={active === row}
                    image={row}
                    onChoice={handleChoice} />
                </div>
                ))}
              </div>
              <TablePagination
                rowsPerPageOptions={[12]}
                component='div'
                count={data.count}
                rowsPerPage={limit}
                page={page}
                onChangePage={(event, value)=>setPage(value)}
              />
            </>
          ) : (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height={400}
              >空</Box>
          )}
        </div>
        <div className={classes.info}>
          <ImageInfo
            img={active}
            onDelete={handleDelete}
          />
        </div>
      </div>
  )
}

export default ImageGrid
