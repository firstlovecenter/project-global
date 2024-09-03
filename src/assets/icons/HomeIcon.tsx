import useCustomColors from 'hooks/useCustomColors'
import { useLocation, useNavigate } from 'react-router-dom'

const HomeIcon = () => {
  const { iconYellow } = useCustomColors()
  const route = useLocation().pathname
  const navigate = useNavigate()

  const iconColor = route == '/' ? iconYellow : 'white'

  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => navigate('/')}
      style={{ cursor: 'pointer' }}
    >
      <path
        d="M6.5663 17.4629H15.4552M9.91929 1.64517L2.3834 7.50642C1.87965 7.89822 1.62778 8.09412 1.44633 8.33945C1.28559 8.55677 1.16585 8.80159 1.09299 9.06189C1.01074 9.35574 1.01074 9.67483 1.01074 10.313V18.3518C1.01074 19.5964 1.01074 20.2187 1.25295 20.694C1.466 21.1122 1.80596 21.4521 2.2241 21.6652C2.69946 21.9074 3.32174 21.9074 4.5663 21.9074H17.4552C18.6997 21.9074 19.322 21.9074 19.7974 21.6652C20.2155 21.4521 20.5555 21.1122 20.7685 20.694C21.0107 20.2187 21.0107 19.5964 21.0107 18.3518V10.313C21.0107 9.67483 21.0107 9.35574 20.9285 9.06189C20.8556 8.80159 20.7359 8.55677 20.5752 8.33945C20.3937 8.09412 20.1418 7.89822 19.6381 7.50642L12.1022 1.64517C11.7118 1.34155 11.5166 1.18974 11.3011 1.13139C11.111 1.0799 10.9105 1.0799 10.7204 1.13139C10.5048 1.18974 10.3097 1.34155 9.91929 1.64517Z"
        stroke={iconColor}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
export default HomeIcon
