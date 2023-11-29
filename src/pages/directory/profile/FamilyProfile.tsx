import {
  Button,
  Container,
  Divider,
  HStack,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ApolloWrapper } from '@jaedag/admin-portal-react-core'
import { useRef } from 'contexts/RefContext'
import { doc } from 'firebase/firestore'
import { getSubFamilyChurch, getSubGeoChurch, pluralize } from 'globalUtils'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFirestore, useFirestoreDocData } from 'reactfire'
import { Church } from 'types/types'
import InfoCard from './components/InfoCard'

const FamilyProfile = () => {
  const { familyRef } = useRef()
  const navigate = useNavigate()

  const contRef = doc(useFirestore(), 'families', familyRef)
  const trendsRef = doc(
    useFirestore(),
    `families/${familyRef}/trends`,
    `families_${familyRef}_trends`
  )
  const { status, data, error } = useFirestoreDocData(contRef)
  const {
    status: trendStatus,
    data: trendData,
    error: trendError,
  } = useFirestoreDocData(trendsRef)

  const family = data as Church

  const subGeoChurch = pluralize(getSubGeoChurch('family'))
  const subFamilyChurch = pluralize(getSubFamilyChurch('family'))

  return (
    <ApolloWrapper
      data={data}
      loading={status === 'loading' || trendStatus === 'loading'}
      error={error || trendError}
    >
      <Container>
        <Heading>{family?.name} Family Insights</Heading>

        <HStack>
          <InfoCard title="Bishops" value={trendData?.bishops ?? 0} />
          <InfoCard title="Apostles" value={trendData?.apostles ?? 0} />
          <InfoCard title="Missionaries" value={trendData?.missionaries ?? 0} />
          <InfoCard
            title="Building Projects"
            value={trendData?.buildingProjects ?? 0}
          />
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
            <Button
              paddingY={6}
              onClick={() => navigate(`/${subGeoChurch.toLowerCase()}-list`)}
            >
              {subGeoChurch} in {family?.name}
            </Button>
          )}
          {!!subFamilyChurch && (
            <Button
              paddingY={6}
              onClick={() => navigate(`/${subFamilyChurch.toLowerCase()}-list`)}
            >
              {subFamilyChurch} in {family.name}
            </Button>
          )}
        </VStack>
      </Container>
    </ApolloWrapper>
  )
}

export default FamilyProfile
