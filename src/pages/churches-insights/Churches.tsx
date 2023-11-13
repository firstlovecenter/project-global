import {
  Button,
  Container,
  Divider,
  HStack,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useUser } from 'contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import InfoCard from './components/InfoCard'
import { getSubFamilyChurch, getSubGeoChurch, pluralize } from 'globalUtils'

const Churches = () => {
  const { user } = useUser()
  const navigate = useNavigate()

  const selectedProfile = user.selectedProfile
  const subGeoChurch = pluralize(getSubGeoChurch(selectedProfile.level))
  const subFamChurch = pluralize(getSubFamilyChurch(selectedProfile.level))

  return (
    <Container>
      <Heading>
        {selectedProfile.name} {selectedProfile.level} Insights
      </Heading>
      <HStack>
        <InfoCard title="Bishops" value={10} />
        <InfoCard title="Bishops" value={10} />
        <InfoCard title="Building Projects" value={10} />
      </HStack>

      <Divider />
      <Text marginY={5}>Trends</Text>
      <VStack spacing={2} align="stretch">
        <Button variant="outline" paddingY={6} onClick={() => navigate('#')}>
          Current Attendance and Income
        </Button>
        <Button variant="outline" paddingY={6}>
          Weekly Attendance and Income
        </Button>
        <Button variant="outline" paddingY={6}>
          Monthly Attendance and Income
        </Button>
        <Button variant="outline" paddingY={6}>
          Yearly Attendance and Income
        </Button>
        <Button variant="outline" paddingY={6}>
          Construction Trends
        </Button>
      </VStack>

      <VStack paddingX={10} marginTop={10} spacing={2} align="stretch">
        {!!subGeoChurch && (
          <Button paddingY={6} onClick={() => navigate('/continents-list')}>
            {subGeoChurch} in Africa
          </Button>
        )}
        {!!subFamChurch && (
          <Button paddingY={6}>{subFamChurch} in Africa</Button>
        )}
      </VStack>
    </Container>
  )
}

export default Churches
