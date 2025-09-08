<template>
  <main class="grid align-center justify-center">
    <div class="flex">
      <div class="grid">
        <span>403</span>
        <span>Access Denied</span>
      </div>
      <svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M224 201.067L208 185.067V50.6665C208 48.3998 208.772 46.4994 210.315 44.9652C211.856 43.4327 213.767 42.6665 216.048 42.6665C218.327 42.6665 220.222 43.4327 221.733 44.9652C223.244 46.4994 224 48.3998 224 50.6665V201.067ZM90.6667 67.9998L74.6667 51.9998V39.9998C74.6667 37.7332 75.4382 35.8327 76.9814 34.2985C78.5227 32.7661 80.4338 31.9998 82.7147 31.9998C84.9938 31.9998 86.8889 32.7661 88.4 34.2985C89.9111 35.8327 90.6667 37.7332 90.6667 39.9998V67.9998ZM135.2 112.267L119.2 96.5332V18.6665C119.2 16.3998 119.972 14.4994 121.515 12.9652C123.056 11.4327 124.967 10.6665 127.248 10.6665C129.527 10.6665 131.422 11.4327 132.933 12.9652C134.444 14.4994 135.2 16.3998 135.2 18.6665V112.267ZM179.733 128H163.733V29.3332C163.733 27.0665 164.505 25.1661 166.048 23.6318C167.589 22.0994 169.5 21.3332 171.781 21.3332C174.06 21.3332 175.956 22.0994 177.467 23.6318C178.978 25.1661 179.733 27.0665 179.733 29.3332V128ZM200.267 223.2L90.6667 113.6V180.8L44.2667 146.667L96.2667 223.467C97.5111 225.422 99.0667 226.889 100.933 227.867C102.8 228.844 104.889 229.333 107.2 229.333H184C187.004 229.333 189.933 228.8 192.787 227.733C195.64 226.667 198.133 225.155 200.267 223.2ZM107.2 245.333C102.4 245.333 97.8222 244.222 93.4667 242C89.1111 239.778 85.6 236.622 82.9334 232.533L14.4 131.2L19.7334 126.933C22.7556 124.267 26.2667 122.578 30.2667 121.867C34.2667 121.155 38.2285 122.328 42.152 125.384L74.6667 150.133V97.5998L6.93335 29.8665L18.4 18.3998L233.6 233.6L222.133 245.067L211.467 234.4C207.911 237.778 203.772 240.444 199.051 242.4C194.329 244.355 189.312 245.333 184 245.333H107.2Z"
          fill="var(--danger)"
        />
      </svg>
    </div>
    <span
      >Please,
      <router-link :to="{ name: 'login' }">use this link</router-link> to go to
      the login page</span
    >
  </main>
</template>

<style scoped>
main {
  grid-area: main;
  justify-items: center;
  margin: 3.125rem clamp(1rem, 7.3vw, 10rem);
  padding: 1rem;
  border: 1px solid var(--todo-border-color);
  border-radius: 0.5rem;

  background-color: var(--todo-bg-color);

  transition-property: background-color, border-color, color;
  transition-duration: 0.35s;

  & > div {
    align-items: center;
    width: min-content;

    & > div {
      justify-items: end;

      span {
        width: min-content;
      }

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

    a {
      color: var(--link);
      text-decoration: underline;
    }
  }
}
</style>
