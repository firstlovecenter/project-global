import React, { FC } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Button,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { RxCaretRight } from 'react-icons/rx'
interface DropDownMenuProps {
  label: string
  options?: { name: string; link: string }[]
}

const DropDownMenu: FC<DropDownMenuProps> = ({ label, options }) => {
  const navigate = useNavigate()

  return (
    <Accordion allowToggle>
      <AccordionItem
        border={'none'}
        borderRadius={'8px'}
        bg="whiteAlpha.400"
        color={'#ffffff'}
        py={1.5}
      >
        <h2>
          <AccordionButton justifyContent={'space-between'}>
            <Text>{label}</Text>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          {options?.map(({ name, link }) => (
            <Button
              key={name}
              p={0}
              pl={0}
              pr={0}
              variant={'ghost'}
              display={'flex'}
              justifyContent={'space-between'}
              borderRadius={'none'}
              borderBottom={'1px solid #96A7AF'}
              color={'#96A7AF'}
              minWidth={'100%'}
              my={2}
              onClick={() => navigate(link)}
            >
              <Text fontWeight="normal">{name}</Text>
              <RxCaretRight />
            </Button>
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default DropDownMenu
