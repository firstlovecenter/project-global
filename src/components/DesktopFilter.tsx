import { Box, Button, Flex } from '@chakra-ui/react'
import FilterButton from './FilterButton'

interface DesktopFilterProps {
  filters: { title: string }[]
  filter: string[]
  setFilter: (filter: string[]) => void
}
const DesktopFilter = ({ filters, filter, setFilter }: DesktopFilterProps) => {
  return (
    <Flex
      justifyContent={'space-between'}
      display={{ base: 'none', lg: 'flex' }}
      mt={5}
    >
      <Flex gap={2} wrap={'wrap'} justifyContent={'center'} width={'100%'}>
        {filters.map((menuFilterItem) => (
          <FilterButton
            key={menuFilterItem.title}
            value={menuFilterItem.title}
            filter={filter}
            setFilter={setFilter}
          />
        ))}
      </Flex>
      <Box>
        <Button
          variant={'ghost'}
          colorScheme="brandTeal"
          fontWeight={'300'}
          p={1}
          onClick={() => setFilter([])}
        >
          {' '}
          Clear Filters
        </Button>
      </Box>
    </Flex>
  )
}

export default DesktopFilter
