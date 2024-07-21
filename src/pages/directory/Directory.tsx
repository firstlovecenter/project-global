import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  VStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'

import SearchBar from 'components/SearchBar'
import { RiFilter3Line } from 'react-icons/ri'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FilterButton from 'components/FilterButton'
import { collection, query } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { Member } from 'types/types'
import MemberListCard from 'components/MemberListCard'
import { ApolloWrapper, capitalise } from '@jaedag/admin-portal-react-core'

const Directory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [filters, setFilters] = useState([''])
  const navigate = useNavigate()
  const currentColorMode = useColorModeValue('light', 'dark')

  const memberCollRef = collection(useFirestore(), 'members')
  const memberQueryRef = query(memberCollRef)

  const { status, data, error } = useFirestoreCollectionData(memberQueryRef, {
    idField: 'id',
  })
  const members = (data as Member[]) || []

  const filterMenuItems = [
    {
      title: 'Members',
    },
    {
      title: 'Bishops',
    },
    {
      title: 'Apostles',
    },
    {
      title: 'Missionaries',
    },
    {
      title: 'Assisting Missionaries',
    },
    {
      title: 'Campus Shepherds',
    },
    {
      title: 'Associate Pastors',
    },
    {
      title: 'Full Time Staff',
    },
  ]

  const colorGoldViaColorMode =
    currentColorMode === 'light' ? 'brandGold.500' : 'brandGold.200'

  return (
    <ApolloWrapper data={data} loading={status === 'loading'} error={error}>
      <Container p={10}>
        <Heading fontWeight={400}>Directory</Heading>
        <Box my={10}>
          <SearchBar />
          <Flex justifyContent={'space-between'}>
            <Button
              variant={'ghost'}
              onClick={() => navigate('/directory/register-member')}
              fontSize={'sm'}
              fontWeight={'300'}
              p={1}
              color={colorGoldViaColorMode}
            >
              Add Member
            </Button>
            <Button
              variant={'ghost'}
              fontSize={'sm'}
              fontWeight={'300'}
              p={1}
              colorScheme="brandTeal"
              onClick={onOpen}
            >
              <Flex alignItems={'center'} gap={1}>
                <span
                  style={{
                    transform: 'translateY(-1.5px)',
                  }}
                >
                  <RiFilter3Line />
                </span>{' '}
                Filters
              </Flex>
            </Button>
          </Flex>
        </Box>
        <VStack marginTop={10} spacing={4} align="stretch"></VStack>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          size={{ base: 'full', md: 'md' }}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody>
              <Center>
                <Heading fontWeight={400}>Filters</Heading>
              </Center>
              <Flex justifyContent={'space-between'}>
                <Button
                  variant={'ghost'}
                  colorScheme="brandTeal"
                  fontWeight={'300'}
                  p={1}
                  onClick={() => setFilters([])}
                >
                  {' '}
                  Clear Filters
                </Button>
                <Button
                  variant={'ghost'}
                  onClick={onClose}
                  fontWeight={'300'}
                  p={1}
                >
                  Done
                </Button>
              </Flex>
              <Flex wrap={'wrap'} gap={2} mt={4}>
                {filterMenuItems.map((item) => (
                  <FilterButton
                    key={item?.title}
                    value={item?.title}
                    filter={filters}
                    setFilter={setFilters}
                  />
                ))}
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        {members?.map((member) => (
          <Box marginTop={5} key={member.id}>
            <MemberListCard
              member={member}
              subtitle={capitalise(member.campus) + ' Campus'}
            />
            <Divider marginTop={2} />
          </Box>
        ))}
      </Container>
    </ApolloWrapper>
  )
}

export default Directory
