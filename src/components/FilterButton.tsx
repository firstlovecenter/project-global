import { Button, CloseButton, Flex, useColorModeValue } from '@chakra-ui/react'
import React, { FC } from 'react'

interface FilterButtonProps {
  filter: string[]
  setFilter: (filter: string[]) => void
  value: string
}

const FilterButton: FC<FilterButtonProps> = ({ filter, setFilter, value }) => {
  const currentColorMode = useColorModeValue('light', 'dark')
  const handleClick = () => {
    setFilter(
      filter.includes(value)
        ? filter.filter((item) => item !== value)
        : [...filter, value]
    )
  }
  return (
    <Button
      value={value}
      onClick={handleClick}
      variant={filter.includes(value) ? 'solid' : 'outline'}
      borderRadius="10000px"
      p={4}
      fontSize={'1.3rem'}
      fontWeight={300}
    >
      <Flex
        gap={2}
        alignItems={'center'}
        {...(filter.includes(value) || currentColorMode === 'light'
          ? { color: 'black' }
          : { color: 'white' })}
      >
        {value}{' '}
        {filter.includes(value) && (
          <CloseButton fontSize={'8px'} fontWeight={'bold'} />
        )}
      </Flex>
    </Button>
  )
}

export default FilterButton
