import React from 'react'
import { Box, Button, ButtonProps, Heading, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import useCustomColors from 'hooks/useCustomColors'

interface ActionButtonProps extends ButtonProps {
  onClick: () => void
  title: string
  subtitle: string
  icon: IconType
}

export const ActionButton = ({
  onClick,
  title,
  subtitle,
  icon: Icon,
  ...props
}: ActionButtonProps) => {
  const { textPrimary } = useCustomColors()

  return (
    <Button onClick={onClick} {...props} h={'auto'}>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        width={'100%'}
        gap={2}
      >
        <Icon />
        <Box ml={2} flex={1}>
          <Heading
            margin={0}
            fontSize={'20px'}
            fontWeight={400}
            color={textPrimary}
          >
            {title}
          </Heading>
          {subtitle && (
            <Text as="p" margin={0} fontSize={'small'} fontWeight={300}>
              {subtitle}
            </Text>
          )}
        </Box>
      </Box>
    </Button>
  )
}
