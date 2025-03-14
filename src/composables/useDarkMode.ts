import { ref, onMounted } from "vue";

export function useDarkMode() {
    const isDark = ref(false);

    const applyTheme = (dark: boolean) => {
        if (dark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    const toggleDarkMode = () => {
        isDark.value = !isDark.value;
        applyTheme(isDark.value);
    };

    onMounted(() => {
        isDark.value = localStorage.getItem("theme") === "dark";
        applyTheme(isDark.value);
    });

    return { isDark, toggleDarkMode };
}