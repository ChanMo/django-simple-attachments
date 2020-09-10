import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import ImageGrid from './image_grid'
import UploadBox from './upload_box'

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`image-picker-tab${index}`}
      {...other}
    >
      {value === index && <Box p={2} style={{height:'100%',overflowY:'hidden'}}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const PickerBox = ({open, onSubmit, onClose, tmp='', onChoice, onDelete, multiple=false}) => {
  const [mode, setMode] = useState(0)

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
    >
      <DialogTitle>选择图片</DialogTitle>
      <DialogContent style={{display:'flex',flexDirection:'column',overflowY:'hidden'}}>
        <Tabs
          value={mode}
          onChange={(event, value)=>setMode(value)}>
          <Tab label="选择" id="image-picker-tab0"></Tab>
          <Tab label="上传" id="image-picker-tab1"></Tab>
        </Tabs>
        <TabPanel value={mode} index={0} style={{flex:1,overflowY:'hidden'}}>
          <ImageGrid
            values={tmp}
            onChoice={onChoice}
            onDelete={onDelete}
          />
        </TabPanel>
        <TabPanel value={mode} index={1}>
          <UploadBox onChoice={onChoice} multiple={multiple} />
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button color='primary' onClick={onSubmit}>确定</Button>
      </DialogActions>
    </Dialog>
  )
}

export default PickerBox
