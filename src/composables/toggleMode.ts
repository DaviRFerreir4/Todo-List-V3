import type { TMode } from "@/types/TMode"
import logoDark from "@/assets/todo-logo-dark.svg"
import logoLight from "@/assets/todo-logo-light.svg"
import iconDark from "@/assets/icons/icon-moon.svg"
import iconLight from "@/assets/icons/icon-sun.svg"

export function toggleMode() {
  const body: Element | null = document.querySelector("body")
  body ? body.classList.toggle("dark-mode") : ""
  if (localStorage.getItem("mode") === "dark") {
    localStorage.setItem("mode", "light")
  } else {
    localStorage.setItem("mode", "dark")
  }
  return localStorage.getItem("mode")
}

export function toggleLogo(mode: TMode) {
  if (mode === "dark") {
    return logoDark
  } else {
    return logoLight
  }
}

export function toggleIcon(mode: TMode) {
  if (mode === "dark") {
    return iconDark
  } else {
    return iconLight
  }
}
