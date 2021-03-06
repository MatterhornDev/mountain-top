import Typography from 'typography'
import CodePlugin from 'typography-plugin-code'
import githubTheme from 'typography-theme-github'

githubTheme.plugins = [
  new CodePlugin()
]

githubTheme.overrideThemeStyles = () => ({
  'a:hover': {
    textDecoration: 'none'
  },
  'h1,h2': {
    borderBottom: 'none'
  }
})

const typography = new Typography(githubTheme)

export const { scale, rhythm, options } = typography
export default typography
