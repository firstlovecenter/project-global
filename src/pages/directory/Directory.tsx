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
  SimpleGrid,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

import SearchBar from 'components/SearchBar'
import { RiFilter3Line } from 'react-icons/ri'
import { useState } from 'react'
import FilterButton from 'components/FilterButton'
import { collection, query, where } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { Member } from 'types/types'
import MemberListCard from 'components/MemberListCard'
import { ApolloWrapper, capitalise } from '@jaedag/admin-portal-react-core'
import { useUser } from 'contexts/UserContext'
import DesktopFilter from 'components/DesktopFilter'
import AddMemberButton from 'components/AddMemberButton'

const Directory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [filters, setFilters] = useState([''])
  const { user } = useUser()

  const { selectedProfile } = user

  const memberCollRef = collection(useFirestore(), 'members')
  const memberQueryRef = query(
    memberCollRef,
    where('campus', '==', selectedProfile.id)
  )

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

  return (
    <ApolloWrapper data={data} loading={status === 'loading'} error={error}>
      <Container maxWidth={'90%'}>
        <Heading fontWeight={400} mt={5}>
          Directory
        </Heading>
        <Box my={10}>
          <SearchBar />
          <DesktopFilter
            filters={filterMenuItems}
            filter={filters}
            setFilter={setFilters}
          />
          <Flex
            justifyContent={{ base: 'space-between', lg: 'flex-end' }}
            mt={{ lg: 5 }}
          >
            <AddMemberButton />
            <Button
              variant={'ghost'}
              fontSize={'sm'}
              fontWeight={'300'}
              p={1}
              colorScheme="brandTeal"
              display={{ base: 'flex', lg: 'none' }}
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
          <Box
            marginTop={5}
            key={member.id}
            display={{ base: 'block', lg: 'none' }}
          >
            <MemberListCard
              member={member}
              subtitle={capitalise(member.campus) + ' Campus'}
            />
            <Divider marginTop={2} display={{ base: 'block', lg: 'none' }} />
          </Box>
        ))}
        {/* Desktop View */}
        <SimpleGrid
          minChildWidth="150px"
          spacing="20px"
          mt={5}
          display={{ base: 'none', lg: 'grid' }}
        >
          {members?.map((member) => (
            <MemberListCard
              member={member}
              subtitle={capitalise(member.campus) + ' Campus'}
            />
          ))}
        </SimpleGrid>
      </Container>
    </ApolloWrapper>
  )
}

export default Directory
