import { Container } from '@chakra-ui/react'

const DesktopContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      display={{ base: 'none', lg: 'block' }}
      maxWidth={'90%'}
      position={'relative'}
      height={'100%'}
    >
      {children}
    </Container>
  )
}

export default DesktopContainer
