import {Box} from '@mui/material'
import {ObjectId} from 'bson'

export default function 查信息({
  _id,
}: {
  _id: ObjectId
}) {
  return (
    <Box component="span" fontSize="smaller" display="flex" justifyContent="space-between">
      <Box component="span" mr={1}>{_id.getTimestamp().toLocaleString()}</Box>
      <Box component="span">d4={_id.id.reduce((acc, cur) => acc + (cur >> 6) + (cur >> 4) + (cur >> 2) + cur & 3) + 1}</Box>
    </Box>
  )
}
