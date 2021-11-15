import React, { useContext } from "react"
import AppContext from './../context/AppContext'
import { useTheme } from '@react-navigation/native'

export default useIsDark = () => {

  const { isDark, setIsDark } = useContext(AppContext)
  const { colors } = useTheme()

  return { isDark, setIsDark, colors }
};
