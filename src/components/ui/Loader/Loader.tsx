import { FC } from 'react'
import { Box, CircularProgress, CircularProgressProps } from '@mui/material'

export const LoaderUI: FC<CircularProgressProps> = (props) => {
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <CircularProgress {...props} />
    </Box>
  )
}
