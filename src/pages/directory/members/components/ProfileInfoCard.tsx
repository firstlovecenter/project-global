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
    <Card p={4} borderRadius={14} mt={10}>
      <Heading size={'sm'} m={0} mb={4}>
        {title}
      </Heading>
      {children}
    </Card>
  )
}

export default ProfileInfoCard
