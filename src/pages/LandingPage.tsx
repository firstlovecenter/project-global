import { Container, Text, Center } from '@chakra-ui/layout'
import React, { useState } from 'react'
import { useAuth } from 'contexts/AuthContext'
import { Stack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { MenuButton } from '@jaedag/admin-portal-react-core'

const LandingPage = () => {
  const [error, setError] = useState('')
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    setError('')

    try {
      await logout()
      navigate('/login')
    } catch (error) {
      setError('Failed to log out')
    }
  }

  const data = [
    {
      ledearName: 'John-Dag',
      roles: [
        {
          levelName: 'First Love Church',
          levelType: 'Denominational',
          role: 'Leader',
        },
        {
          levelName: 'Africa',
          levelType: 'Continent',
          role: 'Leader',
        },
        {
          levelName: 'Ghana',
          levelType: 'Country',
          role: 'Admin',
        },
        {
          levelName: 'Accra',
          levelType: 'Council',
          role: 'Leader',
        },
        {
          levelName: 'Legon',
          levelType: 'Campus',
          role: 'Leader',
        },
      ],
    },
  ]

  return (
    <Container centerContent>
      <Text fontSize="3xl" fontWeight="semi-bold" marginTop={14}>
        Welcome {data[0].ledearName}
      </Text>
      <Text fontSize="xl" fontWeight="semi-bold" marginBottom={12}>
        Choose A Profile
      </Text>
      {data[0].roles?.map((role, index) => (
        <MenuButton
          key={index}
          icon={null}
          color="white"
          title={`${role.levelName}`}
          subtitle={` ${role.levelType} ${role.role}`}
          onClick={() => navigate('/directory')}
        />
      ))}
    </Container>
  )
}

export default LandingPage
