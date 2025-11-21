# Frontend Mentor - Hangman game solution

This is a solution to the [Hangman game challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/hangman-game-rsQiSVLGWn). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

這是 [Frontend Mentor 的 Hangman 遊戲挑戰](https://www.frontendmentor.io/challenges/hangman-game-rsQiSVLGWn)的解決方案。Frontend Mentor 挑戰透過建立真實專案來幫助你提升編程技能。

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Technical Highlights](#technical-highlights)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Learn how to play Hangman from the main menu.
- Start a game and choose a category.
- Play Hangman with a random word selected from that category.
- See their current health decrease based on incorrect letter guesses.
- Win the game if they complete the whole word.
- Lose the game if they make eight wrong guesses.
- Pause the game and choose to continue, pick a new category, or quit.
- View the optimal layout for the interface depending on their device's screen size.
- See hover and focus states for all interactive elements on the page.
- Navigate the entire game only using their keyboard.

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it.

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- **[Astro](https://astro.build/)** - Static Site Generator with View Transitions
- **[React](https://reactjs.org/)** - For interactive components
- **[Nanostores](https://github.com/nanostores/nanostores)** - Tiny state manager (286 bytes)
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **TypeScript** - Type-safe development
- Semantic HTML5 markup
- CSS Grid & Flexbox
- Mobile-first workflow

### 使用技術

- **[Astro](https://astro.build/)** - 靜態網站生成器，支援 View Transitions
- **[React](https://reactjs.org/)** - 用於互動式元件
- **[Nanostores](https://github.com/nanostores/nanostores)** - 輕量級狀態管理器（僅 286 bytes）
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS 框架
- **TypeScript** - 型別安全開發
- 語意化 HTML5 標記
- CSS Grid 與 Flexbox
- Mobile-first 工作流程

### What I learned

#### State Management with Nanostores

Nanostores is an incredibly lightweight state manager that stores state purely in JavaScript memory (closures). This project demonstrates how to manage game state across multiple components without prop drilling.

**Key learning:** Nanostores atoms live in memory and persist as long as the JavaScript execution environment remains active.

```typescript
// src/atoms/gameAtoms.ts
import { atom } from "nanostores";

export const categoryAtom = atom<string>("");
export const answerAtom = atom<string>("");
export const chosenLettersAtom = atom<Set<string>>(new Set());
export const hpAtom = atom<number>(6);
```

#### Cross-Page State Preservation with View Transitions

The biggest challenge was preserving state when navigating between pages. Traditional navigation (`window.location.href`) causes a full page reload, destroying all JavaScript state.

**Solution:** Astro's View Transitions API enables client-side navigation, keeping the JavaScript environment alive and preserving Nanostores state in memory.

> Reference: [View Transition: Maintain State](https://docs.astro.build/en/guides/view-transitions/)

```astro
---
import { ClientRouter } from "astro:transitions";
---

<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<meta name="generator" content={Astro.generator} />

<!-- Primary Meta Tags -->
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />

<ClientRouter />
```

```typescript
// src/components/CategoryPicker.tsx
import { navigate } from "astro:transitions/client";

// Client-side navigation preserves state
navigate("/main"); // ✅ State preserved in memory
```

**Why it works:**

- View Transitions intercepts link clicks
- Fetches new page content via `fetch()`
- Updates DOM without reloading JavaScript
- Nanostores atoms remain in memory

---

### 我學到了什麼

#### 使用 Nanostores 進行狀態管理

Nanostores 是一個極輕量的狀態管理器，將狀態純粹儲存在 JavaScript 記憶體（閉包）中。此專案展示如何在多個元件間管理遊戲狀態，而不需要 prop drilling。

**關鍵學習：** Nanostores atoms 存在於記憶體中，只要 JavaScript 執行環境保持活躍就會持續存在。

```typescript
// src/atoms/gameAtoms.ts
import { atom } from "nanostores";

export const categoryAtom = atom<string>("");
export const answerAtom = atom<string>("");
export const chosenLettersAtom = atom<Set<string>>(new Set());
export const hpAtom = atom<number>(6);
```

#### 使用 View Transitions 實現跨頁面狀態保留

最大的挑戰是在頁面導航時保留狀態。傳統導航（`window.location.href`）會導致完整頁面重新載入，銷毀所有 JavaScript 狀態。

**解決方案：** Astro 的 View Transitions API 啟用客戶端導航，保持 JavaScript 環境運行，並在記憶體中保留 Nanostores 狀態。

```javascript
// astro.config.mjs
export default defineConfig({
  viewTransitions: true, // 啟用客戶端路由
});
```

```typescript
// src/components/CategoryPicker.tsx
import { navigate } from "astro:transitions/client";

// 客戶端導航保留狀態
navigate("/main"); // ✅ 狀態在記憶體中保留
```

**運作原理：**

- View Transitions 攔截連結點擊
- 透過 `fetch()` 獲取新頁面內容
- 更新 DOM 而不重新載入 JavaScript
- Nanostores atoms 保持在記憶體中

### Technical Highlights

#### Game Logic Architecture

All game logic is centralized in `gameAtoms.ts`, following the principle of separating business logic from UI components:

```typescript
export function handleLetterPick(letter: string) {
  const normalizedLetter = letter.toLowerCase().trim();

  // Ignore if letter already chosen
  const currentChosen = chosenLettersAtom.get();
  if (currentChosen.has(normalizedLetter)) return;

  // Add letter to chosen set
  const newChosen = new Set(currentChosen);
  newChosen.add(normalizedLetter);
  chosenLettersAtom.set(newChosen);

  // Check if letter is in answer
  const answer = answerAtom.get().toLowerCase();
  const isCorrect = answer.includes(normalizedLetter);

  if (!isCorrect) {
    // Wrong guess - decrease HP
    const currentHp = hpAtom.get();
    const newHp = Math.max(0, currentHp - 1);
    hpAtom.set(newHp);

    if (newHp === 0) {
      gamePhaseAtom.set("lose");
    }
  }

  checkWinCondition();
}
```

#### Avoiding Hydration Mismatches

When using `client:only` directive with Astro, components render only on the client side, avoiding SSR hydration mismatches:

```astro
<!-- src/pages/main/index.astro -->
<PickAlphabetSection options={alphabet} client:only="react" />
<AnswerSection client:only="react" />
<GameNavbar isHPVisible={true} client:only="react" />
```

---

### 技術亮點

#### 遊戲邏輯架構

所有遊戲邏輯集中在 `gameAtoms.ts` 中，遵循將業務邏輯與 UI 元件分離的原則：

```typescript
export function handleLetterPick(letter: string) {
  const normalizedLetter = letter.toLowerCase().trim();

  // 忽略已選擇的字母
  const currentChosen = chosenLettersAtom.get();
  if (currentChosen.has(normalizedLetter)) return;

  // 將字母加入已選集合
  const newChosen = new Set(currentChosen);
  newChosen.add(normalizedLetter);
  chosenLettersAtom.set(newChosen);

  // 檢查字母是否在答案中
  const answer = answerAtom.get().toLowerCase();
  const isCorrect = answer.includes(normalizedLetter);

  if (!isCorrect) {
    // 錯誤猜測 - 減少 HP
    const currentHp = hpAtom.get();
    const newHp = Math.max(0, currentHp - 1);
    hpAtom.set(newHp);

    if (newHp === 0) {
      gamePhaseAtom.set("lose");
    }
  }

  checkWinCondition();
}
```

#### 避免 Hydration 不匹配

使用 Astro 的 `client:only` 指令時，元件僅在客戶端渲染，避免 SSR hydration 不匹配問題：

```astro
<!-- src/pages/main/index.astro -->
<PickAlphabetSection options={alphabet} client:only="react" />
<AnswerSection client:only="react" />
<GameNavbar isHPVisible={true} client:only="react" />
```

### Useful resources

- **[Nanostores Documentation](https://github.com/nanostores/nanostores)** - Essential guide for understanding how Nanostores stores state in JavaScript closures and manages subscriptions.
- **[Astro View Transitions Guide](https://docs.astro.build/en/guides/view-transitions/)** - Comprehensive documentation on enabling client-side navigation to preserve JavaScript state across page transitions.
- **[@nanostores/react](https://github.com/nanostores/react)** - React integration for Nanostores, providing the `useStore()` hook for reactive components.
- **[Astro Client Directives](https://docs.astro.build/en/reference/directives-reference/#client-directives)** - Understanding `client:only`, `client:load`, and other directives for controlling component hydration.

### 有用的資源

- **[Nanostores 文檔](https://github.com/nanostores/nanostores)** - 理解 Nanostores 如何在 JavaScript 閉包中儲存狀態並管理訂閱的必備指南。
- **[Astro View Transitions 指南](https://docs.astro.build/en/guides/view-transitions/)** - 關於啟用客戶端導航以在頁面轉換時保留 JavaScript 狀態的完整文檔。
- **[@nanostores/react](https://github.com/nanostores/react)** - Nanostores 的 React 整合，提供 `useStore()` hook 用於響應式元件。
- **[Astro Client 指令](https://docs.astro.build/en/reference/directives-reference/#client-directives)** - 理解 `client:only`、`client:load` 等指令以控制元件 hydration。

## Key Takeaways / 關鍵要點

### English

1. **Nanostores stores state in memory (JavaScript closures)** - State persists only as long as the JavaScript execution environment is active.
2. **Traditional navigation destroys state** - `window.location.href` causes a full page reload, destroying all in-memory state.
3. **View Transitions preserve state** - Client-side navigation keeps JavaScript running, maintaining Nanostores atoms in memory.
4. **Separate logic from UI** - Keeping game logic in stores makes testing easier and UI framework-agnostic.
5. **`client:only` prevents hydration issues** - Rendering components only on the client avoids SSR/client mismatches.

### 繁體中文

1. **Nanostores 將狀態存在記憶體中（JavaScript 閉包）** - 狀態僅在 JavaScript 執行環境活躍時持續存在。
2. **傳統導航會銷毀狀態** - `window.location.href` 導致完整頁面重新載入，銷毀所有記憶體中的狀態。
3. **View Transitions 保留狀態** - 客戶端導航保持 JavaScript 運行，維持 Nanostores atoms 在記憶體中。
4. **將邏輯與 UI 分離** - 將遊戲邏輯保存在 stores 中使測試更容易，且不依賴特定 UI 框架。
5. **`client:only` 防止 hydration 問題** - 僅在客戶端渲染元件可避免 SSR/客戶端不匹配。

## Author

- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
