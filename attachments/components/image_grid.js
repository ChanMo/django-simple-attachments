import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TablePagination from '@material-ui/core/TablePagination'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'

const host = process.env.STORYBOOK ? process.env.API : ''

export const ImageBox = ({image, onChoice, selected=false}) => (
  <Card>
    <CardActionArea onClick={()=>onChoice(image.source)}>
      <CardMedia
        style={selected ? {height:150, border:'4px solid #00b894',boxSizing:'border-box'} : {height:150}}
        image={`${host}${image.source}?width=150&height=150`}
        title={image.name}
      />
    </CardActionArea>
  </Card>
)

const ImageGrid = ({onChoice, values=[]}) => {
  const [data, setData] = useState({count:0, results:[]})
  const [page, setPage] = useState(0)
  const limit = 48

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
        const res = await fetch(`${host}/api/attachments/?limit=${limit}&offset=${offset}`, options)
        const resJson = await res.json()
        setData(resJson)
      } catch {
        console.log('fetch images error')
      }
    }
    fetchData()
  }, [page])

  if(!data.count) {
    return <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={400}
    >空</Box>
  }

  return (
    <React.Fragment>
    <Grid container spacing={1}>
      {data.results.map(row => (
      <Grid key={row.id} item xs={4} sm={3} md={2} lg={1}>
        <ImageBox
          selected={values.indexOf(row.source) > -1}
          image={row}
          onChoice={onChoice} />
      </Grid>
      ))}
    </Grid>
    <TablePagination
      rowsPerPageOptions={[12]}
      component='div'
      count={data.count}
      rowsPerPage={limit}
      page={page}
      onChangePage={(event, value)=>setPage(value)}
    />
  </React.Fragment>
  )
}

export default ImageGrid
