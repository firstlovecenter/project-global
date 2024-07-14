import React from 'react'
import { Box, Button, ButtonProps, Heading } from '@chakra-ui/react'
import { IconType } from 'react-icons'

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
  return (
    <Button onClick={onClick} {...props}>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        padding={'1rem'}
        width={'100%'}
        gap={2}
      >
        <Icon />
        <Box ml={2} flex={1}>
          <Heading
            style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: 400,
            }}
          >
            {title}
          </Heading>
          {subtitle && (
            <p style={{ margin: 0, fontSize: 'small', fontWeight: 300 }}>
              {subtitle}
            </p>
          )}
        </Box>
      </Box>
    </Button>
  )
}
