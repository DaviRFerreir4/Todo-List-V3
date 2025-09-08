<template>
  <main class="container-child grid justify-center align-center">
    <div class="flex align-center">
      <div class="grid">
        <span>404</span>
        <span>Not Found</span>
      </div>
      <svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M128 234.667C99.3778 210.311 78 187.689 63.8667 166.8C49.7334 145.911 42.6667 126.578 42.6667 108.8C42.6667 82.1334 51.2445 60.8889 68.4 45.0667C85.5556 29.2445 105.422 21.3334 128 21.3334C130.844 21.3334 133.689 21.5111 136.533 21.8667C139.378 22.2222 142.222 22.6667 145.067 23.2V39.4667C142.281 38.7556 139.496 38.2222 136.712 37.8667C133.926 37.5111 131.022 37.3334 128 37.3334C108.548 37.3334 92.1289 44.0089 78.744 57.36C65.3591 70.7129 58.6667 87.8596 58.6667 108.8C58.6667 122.133 64.4445 137.556 76 155.067C87.5556 172.578 104.889 192.089 128 213.6C151.644 192.089 169.111 172.578 180.4 155.067C191.689 137.556 197.333 122.133 197.333 108.8C197.333 107.378 197.289 105.956 197.2 104.533C197.111 103.111 196.978 101.689 196.8 100.267H212.8C212.978 101.689 213.111 103.111 213.2 104.533C213.289 105.956 213.333 107.378 213.333 108.8C213.333 126.578 206.267 145.911 192.133 166.8C178 187.689 156.622 210.311 128 234.667ZM180 82.1334L202.4 59.7334L224.8 82.1334L236 70.9334L213.6 48.5334L236 26.1334L224.8 14.9333L202.4 37.3334L180 14.9333L168.8 26.1334L191.2 48.5334L168.8 70.9334L180 82.1334ZM128.024 125.333C133.164 125.333 137.556 123.503 141.2 119.843C144.844 116.182 146.667 111.782 146.667 106.643C146.667 101.503 144.836 97.1111 141.176 93.4667C137.516 89.8222 133.116 88 127.976 88C122.836 88 118.444 89.8302 114.8 93.4907C111.156 97.1511 109.333 101.551 109.333 106.691C109.333 111.83 111.164 116.222 114.824 119.867C118.484 123.511 122.884 125.333 128.024 125.333Z"
          fill="var(--danger)"
        />
      </svg>
    </div>
    <span>Please, use the navigation menu to navigate in the website</span>
  </main>
</template>

<style scoped>
.container-child {
  grid-area: main;
}

main {
  justify-items: center;
  margin: 3.125rem 5rem;
  padding: 1rem;
  border: 1px solid var(--todo-border-color);
  border-radius: 0.5rem;

  background-color: var(--todo-bg-color);

  transition-property: background-color, border-color, color;
  transition-duration: 0.35s;

  & > div {
    & > div {
      span:nth-child(1) {
        font: var(--fw-rg) clamp(3rem, 11vw, 15rem) / 100% var(--ff);
        color: var(--danger);
      }

      span:nth-child(2) {
        font: var(--fw-rg) clamp(1.5rem, 6vw, 15rem) / 100% var(--ff);
        color: var(--danger);
      }
    }

    svg {
      width: clamp(6rem, 23vw, 15rem);
    }
  }

  & > span {
    font: var(--fw-rg) clamp(0.5rem, 2vw, 3rem) / 100% var(--ff);
    text-align: center;
  }
}
</style>
