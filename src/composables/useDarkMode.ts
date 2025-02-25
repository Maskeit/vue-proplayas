import { ref, onMounted } from "vue";

export function useDarkMode() {
    const isDark = ref(false);

    const toggleDarkMode = () => {
        isDark.value = !isDark.value;
        if (isDark.value) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    onMounted(() => {
        isDark.value = localStorage.getItem("theme") === "dark";
        if (isDark.value) {
            document.documentElement.classList.add("dark");
        }
    });

    return { isDark, toggleDarkMode };
}