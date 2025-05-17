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
- [x] score: number
- [x] level: number
- [x] input: string
- [x] running: boolean
- [x] streak: number
- [x] gameOver: boolean
- [x] playerY: number (dinamis tergantung keyboard)

### Actions:
- [x] setInput(), resetInput()
- [x] addScore()
- [x] incrementStreak()
- [x] setLevel()
- [x] setPlayerY()
- [x] setGameOver(), resetGame()

## 5. Entities
### createWord(x, y)
- [x] Props: word, meaning, position, speed

### createPlayer(x, y)
- [x] Posisi tetap di bawah (y = height - keyboardHeight - offset)
- [x] Sync ke Zustand → setPlayerY(y)

## 6. Game Logic (gameSystems.ts)
- [x] Loop setiap entity word
- [x] Movement: y += speed * delta
- [x] Collision dengan playerY → setGameOver()
- [x] Match Input dengan meaning
  - [x] Reset posisi kata
  - [x] Tambah skor
  - [x] Tambah streak
  - [x] Naikkan level setiap 10 benar
  - [x] Reset input

## 7. UI Components
- [x] GameInput – input box dengan real-time input checking
- [x] Word – visual jatuh dari atas
- [x] Player – visual di bawah (opsional: icon)
- [x] HUD – tampilkan skor dan level
- [x] StartScreen – pilih level awal (1–5)
- [x] GameOver – muncul saat kalah
- [x] HUDDev – info debug (FPS, entity, dll)

## 8. Styling & FX
- [x] Layout dengan NativeWind
- [ ] Optional animasi dengan Reanimated
  - [ ] Efek muncul kata (fade in + scale)
  - [ ] Efek skor naik (pop-up animation)
  - [ ] Efek matching kata (glow effect)
  - [ ] Efek player rotation (smooth transition)
  - [ ] Efek game over (screen shake)

## 9. Bonus / Enhancement
- [ ] Power-up items:
  - [ ] Freeze - Menghentikan semua kata untuk beberapa detik
  - [ ] Bomb - Menghapus semua kata di layar
  - [ ] Shield - Melindungi dari satu kesalahan
  - [ ] Time Slow - Memperlambat kecepatan kata
  - [ ] Multi Score - 2x skor untuk beberapa detik
- [ ] Audio FX:
  - [ ] Background music dengan volume control
  - [ ] Sound effect untuk typing
  - [ ] Sound effect untuk kata match
  - [ ] Sound effect untuk power-up
  - [ ] Sound effect untuk game over
- [ ] Visual Polish:
  - [ ] Particle effects saat kata terhapus
  - [ ] Trail effect pada player rotation
  - [ ] Dynamic background dengan gradient
  - [ ] Achievement badges/popup
- [ ] Gameplay Additions:
  - [ ] Combo system untuk bonus skor
  - [ ] Daily challenges
  - [ ] High score leaderboard
  - [ ] Tutorial mode untuk pemula
  - [ ] Different game modes (time attack, endless)
