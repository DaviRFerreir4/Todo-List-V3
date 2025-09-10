// Importação de assets
import logoDark from "@/assets/todo-logo-dark.svg"
import logoLight from "@/assets/todo-logo-light.svg"
import logoDarkCut from "@/assets/todo-logo-dark-cut.svg"
import logoLightCut from "@/assets/todo-logo-light-cut.svg"
import iconDark from "@/assets/icons/moon.svg"
import iconLight from "@/assets/icons/sun.svg"

// Função para trocar modo
export function toggleMode(): string | null {
  // Recupera o body e alterna a classe dark-mode
  const body: Element | null = document.querySelector("body")
  body ? body.classList.toggle("dark-mode") : ""
  // Troca as preferências de modo no localStorage
  if (localStorage.getItem("mode") === "dark") {
    localStorage.setItem("mode", "light")
  } else {
    localStorage.setItem("mode", "dark")
  }
  // Retorna o modo para troca da src das imagens
  return localStorage.getItem("mode")
}

// Alterna o logo entre dark e light baseado no modo ativo e se ele é cortado ou não
export function toggleLogo(mode: null | string, cut: boolean = false): string {
  if (mode === "dark") {
    return cut ? logoDarkCut : logoDark
  } else {
    return cut ? logoLightCut : logoLight
  }
}

// Alterna o icone de modo entre dark e light baseado no modo ativo
export function toggleIcon(mode: null | string): string {
  if (mode === "dark") {
    return iconDark
  } else {
    return iconLight
  }
}
