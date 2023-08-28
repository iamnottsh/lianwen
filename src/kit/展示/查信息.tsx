import {Box} from '@mui/material'
import {ObjectId} from 'bson'

export default function 查信息({
  _id,
}: {
  _id: ObjectId
}) {
  return (
    <Box fontSize="smaller" display="flex" justifyContent="space-between">
      <Box mr={1}>{_id.getTimestamp().toLocaleString()}</Box>
      <Box>[0,9]={new DataView(_id.id.buffer).getUint8(11) % 10}</Box>
    </Box>
  )
}
