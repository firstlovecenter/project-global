import { Card, Heading } from '@chakra-ui/react'
import React from 'react'

interface ProfileInfoCardProps {
  title: string
  children: React.ReactNode
}

const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({
  title,
  children,
}) => {
  return (
    <>
      <Heading size={'0.5rem'} mt={10} mb={1}>
        {title}
      </Heading>
      <Card p={4} borderRadius={14}>
        {children}
      </Card>
    </>
  )
}

export default ProfileInfoCard
