/**
 * The dialogue overlay scene — renders conversation text and choices in a box at the botttom of the game.
 * Steps through Dialogue arrays, resolves conditional text, applies choice flags, and routes input to selection.
 * Runs as a parallel Phaser scene; GameScene hands it content and polls isShowing/handleInput, text displays with a typewriter animation.
 */
import Phaser from "phaser"
import type { Flags } from "../core/flags"
import type { Dialogue, DialogueChoice } from "../core/dialogue"
import type { InputSource } from "../core/input"
import { GAME_WIDTH, GAME_HEIGHT } from "../config"

// box geometry — bottom-anchored, derived from the virtual screen
const BOX_MARGIN = 4
const BOX_H = 84
const BOX_W = GAME_WIDTH - BOX_MARGIN * 2
const BOX_X = BOX_MARGIN
const BOX_Y = GAME_HEIGHT - BOX_H - BOX_MARGIN
const TEXT_X = 12
const TEXT_Y = 158
const TEXT_WRAP = BOX_W - 2 * (TEXT_X - BOX_X)
const CHOICE_ROW_Y = 204
const CHOICE_SPACING = 20
const CHOICE_W = 200
const CHOICE_H = 18
const TYPE_MS_PER_CHAR = 30

/** Overlay scene that walks a Dialogue[] and renders its current line. */
export class DialogueSystem extends Phaser.Scene {
  private textSprite!: Phaser.GameObjects.Text
  private choiceButtons: Phaser.GameObjects.Container[] = []
  private choiceBackgrounds: Phaser.GameObjects.Rectangle[] = []
  private currentChoices: DialogueChoice[] = []
  private selectedChoice = 0
  private currentDialogue: Dialogue[] = []
  private currentIndex = 0
  private flags: Flags = {}
  private box!: Phaser.GameObjects.Rectangle
  private fullText = ""
  private shownCount = 0
  private typeAccumulator = 0
  private typing = false
  private pendingChoices: DialogueChoice[] | null = null

  isShowing = false

  constructor() {
    super("DialogueSystem")
  }

  /** Builds the hidden bottom-anchored box and the prompt text object.  Hides the box. */
  create(): void {
    this.box = this.add.rectangle(BOX_X, BOX_Y, BOX_W, BOX_H, 0x000000)
      .setOrigin(0, 0)
      .setStrokeStyle(2, 0xf8f8f8)
      .setVisible(false)

    this.textSprite = this.add.text(TEXT_X, TEXT_Y, "", {
      fontSize: "14px",
      color: "#ffffff",
      wordWrap: { width: TEXT_WRAP }
    })
    this.textSprite.setOrigin(0, 0)
    this.textSprite.setVisible(false)
  }

  /** Ticks the typewriter, revealing characters on a fixed cadence. */
  override update(_time: number, delta: number): void {
    if (!this.isShowing || !this.typing) return

    this.typeAccumulator += delta
    while (this.typeAccumulator >= TYPE_MS_PER_CHAR && this.shownCount < this.fullText.length) {
      this.typeAccumulator -= TYPE_MS_PER_CHAR
      this.shownCount++
    }

    if (this.shownCount >= this.fullText.length) {
      this.finishTyping()
    } else {
      this.textSprite.setText(this.fullText.slice(0, this.shownCount))
    }
  }

  /** Starts a conversation, normalizing plain string lines into Dialogue objects. */
  showDialogue(dialogue: Dialogue[] | string[], flags: Flags): void {
    // Convert string lines to Dialogue objects if needed
    this.currentDialogue = dialogue.map((line) =>
      typeof line === "string" ? { text: line } : line
    )
    this.currentIndex = 0
    this.flags = flags
    this.isShowing = true
    this.box.setVisible(true)
    this.choiceButtons.forEach(btn => btn.destroy())
    this.choiceButtons = []
    this.currentChoices = []
    this.showCurrentLine()
  }

  /** Renders the first line at-or-after currentIndex whose condition passes, or ends the dialogue. */
  private showCurrentLine(): void {
    while (this.currentIndex < this.currentDialogue.length) {
      const line = this.currentDialogue[this.currentIndex]!
      if (line.condition && !line.condition(this.flags)) {
        this.currentIndex++
        continue
      }

      const text = typeof line.text === "function" ? line.text(this.flags) : line.text
      this.pendingChoices = line.choices && line.choices.length > 0 ? line.choices : null
      this.showText(text)
      return
    }
    this.endDialogue()
  }

  /** Begins typing the given text into the box, clearing any stale choice buttons. */
  private showText(text: string): void {
    this.choiceButtons.forEach(btn => btn.destroy())
    this.choiceButtons = []
    this.choiceBackgrounds = []
    this.currentChoices = []

    this.fullText = text
    this.shownCount = 0
    this.typeAccumulator = 0
    this.typing = true
    this.textSprite.setText("")
    this.textSprite.setVisible(true)

    if (text.length === 0) this.finishTyping()
  }

  /** Renders clickable choice buttons below the prompt, first one selected. */
  private showChoices(choices: DialogueChoice[]): void {
    // #4: the prompt stays visible; choices render below it
    this.currentChoices = choices
    this.selectedChoice = 0

    choices.forEach((choice, i) => {
      const button = this.add.container(GAME_WIDTH / 2, CHOICE_ROW_Y + i * CHOICE_SPACING)
      const bg = this.add.rectangle(0, 0, CHOICE_W, CHOICE_H, 0x444444)
      const label = this.add.text(0, 0, choice.text, {
        fontSize: "14px",
        color: "#ffffff"
      })

      label.setOrigin(0.5, 0.5)
      button.add([bg, label])

      // #5: containers have no width/height of their own, so an
      // explicit hit area is required for pointerdown to ever fire
      button.setInteractive(
        new Phaser.Geom.Rectangle(-CHOICE_W / 2, -CHOICE_H / 2, CHOICE_W, CHOICE_H),
        Phaser.Geom.Rectangle.Contains
      )

      button.on("pointerdown", () => {
        this.makeChoice(choice)
      })

      this.choiceButtons.push(button)
      this.choiceBackgrounds.push(bg)
    })

    this.selectChoice(0)
  }

  /** Highlights the given choice index and records it as selected. */
  private selectChoice(index: number): void {
    this.selectedChoice = index
    this.choiceBackgrounds.forEach((bg, i) => {
      bg.setFillStyle(i === index ? 0x777777 : 0x444444)
    })
  }

  /** Applies the choice's flag effect and advances the dialogue. */
  private makeChoice(choice: DialogueChoice): void {
    if (choice.flag && choice.value !== undefined) {
      this.flags[choice.flag] = choice.value
    }
    this.advance()
  }

  /** Runs the line's onComplete, moves to the next line, and shows it. */
  private advance(): void {
    const line = this.currentDialogue[this.currentIndex]
    if (line && line.onComplete) {
      line.onComplete(this.flags)
    }
    this.currentIndex++
    this.showCurrentLine()
  }

  /** The A/B button continuation path — a thin alias for advance. */
  private nextLine(): void {
    this.advance()
  }

  /** Hides the prompt and resets all dialogue state. */
  private endDialogue(): void {
    this.isShowing = false
    this.textSprite.setVisible(false)
    this.choiceButtons.forEach(btn => btn.destroy())
    this.choiceButtons = []
    this.choiceBackgrounds = []
    this.currentChoices = []
    this.selectedChoice = 0
    this.currentDialogue = []
    this.currentIndex = 0
    this.fullText = ""
    this.shownCount = 0
    this.typeAccumulator = 0
    this.typing = false
    this.pendingChoices = null
    this.box.setVisible(false)
  }

  /** Routes just-presses to skipping the typewriter, choice navigation, or advancing lines. */
  handleInput(input: InputSource): void {
    if (!this.isShowing) return

    if (this.typing) {
      if (input.justPressed("a") || input.justPressed("b")) {
        this.finishTyping()
      }
      return
    }

    if (this.choiceButtons.length > 0) {
      if (input.justPressed("up")) {
        this.selectChoice((this.selectedChoice - 1 + this.currentChoices.length) % this.currentChoices.length)
      }
      if (input.justPressed("down")) {
        this.selectChoice((this.selectedChoice + 1) % this.currentChoices.length)
      }
      if (input.justPressed("a")) {
        const choice = this.currentChoices[this.selectedChoice]
        if (choice) {
          this.makeChoice(choice)
        }
      }
    } else {
      if (input.justPressed("a")) {
        this.nextLine()
      }
      if (input.justPressed("b")) {
        this.nextLine()
      }
    }
  }

  /** Completes the typewriter instantly and reveals any choices the line held back. */
  private finishTyping(): void {
    this.shownCount = this.fullText.length
    this.textSprite.setText(this.fullText)
    this.typing = false
    if (this.pendingChoices) {
      this.showChoices(this.pendingChoices)
      this.pendingChoices = null
    }
  }
}
