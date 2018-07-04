import styled from 'styled-components'
import { opacity } from 'utilities/styles'

const Title = level => styled[`h${level}`]`
  color: ${props => opacity(props.theme.colors.text, props.theme.opacity.titles)};
`

export default Title
