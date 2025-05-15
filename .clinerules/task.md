# Z-Type Game – To-Do List (Updated Mei 2025)

## Tech Stack
- React Native Game Engine (RNGE)  
- Zustand (State Management)
- NativeWind, Blur, Lucide Icon (UI)
- Reanimated (Animation)
- TypeScript

## 1. Core Setup
- [x] ZTypeGame.tsx (screen utama game)
  - [x] SafeAreaView
  - [x] KeyboardAvoidingView
  - [x] GameEngine

## 2. Keyboard Handling
- [x] useKeyboard hook
- [x] Integrasikan ke entity player (playerY disimpan ke store)

## 3. Constants (constants.ts)
- [x] List kata: [{ id, word, meaning }] - Korean-Indonesian translations
- [x] Helper: getRandomWords(level: number, count: number) with level-based difficulty

## 4. Zustand Store (store.ts)
### State:
- [ ] score: number
- [ ] level: number
- [ ] input: string
- [ ] running: boolean
- [ ] streak: number
- [ ] gameOver: boolean
- [ ] playerY: number (dinamis tergantung keyboard)

### Actions:
- [ ] setInput(), resetInput()
- [ ] addScore()
- [ ] incrementStreak()
- [ ] setLevel()
- [ ] setPlayerY()
- [ ] setGameOver(), resetGame()

## 5. Entities
### createWord(x, y)
- [ ] Props: word, meaning, position, speed

### createPlayer(x, y)
- [ ] Posisi tetap di bawah (y = height - keyboardHeight - offset)
- [ ] Sync ke Zustand → setPlayerY(y)

## 6. Game Logic (gameSystems.ts)
- [ ] Loop setiap entity word
- [ ] Movement: y += speed * delta
- [ ] Collision dengan playerY → setGameOver()
- [ ] Match Input dengan meaning
  - [ ] Reset posisi kata
  - [ ] Tambah skor
  - [ ] Tambah streak
  - [ ] Naikkan level setiap 10 benar
  - [ ] Reset input

## 7. UI Components
- [x] GameInput – input box dengan real-time input checking
- [ ] Word – visual jatuh dari atas
- [ ] Player – visual di bawah (opsional: icon)
- [ ] HUD – tampilkan skor dan level
- [ ] StartScreen – pilih level awal (1–5)
- [ ] GameOver – muncul saat kalah
- [ ] HUDDev – info debug (FPS, entity, dll)

## 8. Styling & FX
- [x] Layout dengan NativeWind
- [ ] Optional animasi dengan Reanimated
  - [ ] Efek muncul kata
  - [ ] Efek skor naik

## 9. Bonus / Enhancement
- [ ] Power-up item (misal: freeze, bomb)
