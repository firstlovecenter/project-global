import React from 'react'
import { Box, Button, ButtonProps, Container } from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface ActionButtonProps extends ButtonProps {
  onClick: () => void
  title: string
  subtitle: string
  icon: IconType
  subColor: string
}

export const ActionButton = ({
  onClick,
  title,
  subtitle,
  icon: Icon,
  subColor,
  ...props
}: ActionButtonProps) => {
  return (
    <Button onClick={onClick} {...props} color={subColor}>
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
          <h2
            style={{
              margin: 0,
              fontSize: '20px',
              color: 'white',
              fontWeight: 400,
            }}
          >
            {title}
          </h2>
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
