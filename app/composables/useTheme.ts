export function useTheme() {
    const setLight = () => {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
    }

    const setDark = () => {
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add('dark')
    }

    return { setLight, setDark }
}