import useCustomColors from 'hooks/useCustomColors'
import { useLocation, useNavigate } from 'react-router-dom'

const ChurchIcon = () => {
  const { iconYellow } = useCustomColors()
  const route = useLocation().pathname
  const navigate = useNavigate()

  const iconColor = route == '/churches' ? iconYellow : 'white'

  return (
    <svg
      width="20"
      height="28"
      viewBox="0 0 20 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => navigate('/churches')}
      style={{ cursor: 'pointer' }}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.0001 0C10.5712 0 11.0345 0.458112 11.0345 1.02272V3.06817H13.1035C13.6746 3.06817 14.138 3.52629 14.138 4.0909C14.138 4.65551 13.6746 5.11362 13.1035 5.11362H11.0345V8.3589L19.1903 14.5406C19.7009 14.9268 19.9999 15.5273 19.9999 16.1639V25.2273C19.9999 26.3565 19.0732 27.2727 17.9309 27.2727H2.06895C0.926719 27.2727 0 26.3565 0 25.2273V16.1639C0 15.5273 0.29903 14.9268 0.809548 14.5406L8.96537 8.3589V5.11362H6.89641C6.32531 5.11362 5.86194 4.65551 5.86194 4.0909C5.86194 3.52629 6.32531 3.06817 6.89641 3.06817H8.96537V1.02272C8.96537 0.458112 9.42895 0 10.0001 0ZM10.0001 10.1526L2.06906 16.1638V25.2272H5.51732V21.4772C5.51732 19.0296 7.52431 17.0454 10.0001 17.0454C12.4758 17.0454 14.4828 19.0296 14.4828 21.4772V25.2272H17.931V16.1638L10.0001 10.1526ZM12.4138 25.2272V21.4772C12.4138 20.1589 11.3336 19.0909 10.0001 19.0909C8.66654 19.0909 7.58627 20.1589 7.58627 21.4772V25.2272H12.4138Z"
        fill={iconColor}
      />
    </svg>
  )
}
export default ChurchIcon
