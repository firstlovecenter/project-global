import { Container } from '@chakra-ui/react'

interface MobileContainerProps extends React.PropsWithChildren {
  children: React.ReactNode
  p: number
}
const MobileContainer = ({ children, p, ...props }: MobileContainerProps) => {
  return (
    <Container display={{ base: 'block', lg: 'none' }} p={p} {...props}>
      {children}
    </Container>
  )
}

export default MobileContainer
