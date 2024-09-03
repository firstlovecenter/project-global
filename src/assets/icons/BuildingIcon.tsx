import useCustomColors from 'hooks/useCustomColors'
import { useLocation, useNavigate } from 'react-router-dom'

const BuildingIcon = () => {
  const { iconYellow } = useCustomColors()
  const route = useLocation().pathname
  const navigate = useNavigate()

  const iconColor = route == '/buildings' ? iconYellow : 'white'

  return (
    <svg
      width="23"
      height="18"
      viewBox="0 0 23 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => navigate('/buildings')}
      style={{ cursor: 'pointer' }}
    >
      <path
        d="M1.5 17H3.5M3.5 17H11.5M3.5 17V4.2002C3.5 3.08009 3.5 2.51962 3.71799 2.0918C3.90973 1.71547 4.21547 1.40973 4.5918 1.21799C5.01962 1 5.58009 1 6.7002 1H8.3002C9.4203 1 9.9801 1 10.4079 1.21799C10.7842 1.40973 11.0905 1.71547 11.2822 2.0918C11.5 2.5192 11.5 3.07899 11.5 4.19691V7.2461M11.5 17H19.5M11.5 17V7.2461M11.5 7.2461L11.8614 6.92139C12.6173 6.24235 12.9953 5.90273 13.4226 5.77393C13.799 5.66045 14.2007 5.66045 14.5771 5.77393C15.0045 5.90275 15.3827 6.2422 16.1387 6.92139L18.4387 8.9877C18.8295 9.3388 19.0245 9.5146 19.1647 9.7252C19.2889 9.9118 19.3812 10.1178 19.437 10.335C19.5 10.5799 19.5 10.843 19.5 11.3682V17M19.5 17H21.5"
        stroke={iconColor}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
export default BuildingIcon
