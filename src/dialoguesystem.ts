import Phaser from "phaser"
import type { Flags } from "./flags"
import type { Dialogue, DialogueChoice, } from "./dialogue"
import type { InputSource } from "./input"

export class DialogueSystem extends Phaser.Scene {
  private textSprite!: Phaser.GameObjects.Text
  private choiceButtons: Phaser.GameObjects.Container[] = []
  private choiceBackgrounds: Phaser.GameObjects.Rectangle[] = []
  private currentChoices: DialogueChoice[] = []
  private selectedChoice = 0
  private currentDialogue: Dialogue[] = []
  private currentIndex = 0
  private flags: Flags = {}

  isShowing = false

  constructor() {
    super("DialogueSystem")
  }

  create(): void {
    // Prompt text (centered, white text)
    this.textSprite = this.add.text(120, 100, "", {
      fontSize: "14px",
      color: "#ffffff",
      align: "center",
      wordWrap: { width: 200 }
    })
    this.textSprite.setOrigin(0.5, 0.5)
    this.textSprite.setVisible(false)
  }

  showDialogue(dialogue: Dialogue[] | string[], flags: Flags): void {
    // Convert string lines to Dialogue objects if needed
    this.currentDialogue = dialogue.map((line) =>
      typeof line === "string" ? { text: line } : line
    )
    this.currentIndex = 0
    this.flags = flags
    this.isShowing = true
    this.choiceButtons.forEach(btn => btn.destroy())
    this.choiceButtons = []
    this.currentChoices = []
    this.showCurrentLine()
  }

  private showCurrentLine(): void {
    if (this.currentIndex >= this.currentDialogue.length) {
      this.endDialogue()
      return
    }

    const line = this.currentDialogue[this.currentIndex]!

    // #4: resolve and show the text for every line — on choice pages
    // it's the question the choices are answering
    const text = typeof line.text === "function" ? line.text(this.flags) : line.text
    this.showText(text)

    if (line.choices && line.choices.length > 0) {
      this.showChoices(line.choices)
    }
  }

  private showText(text: string): void {
    // Clearing old buttons here also means consecutive choice pages
    // can't stack (bonus fix for #8)
    this.choiceButtons.forEach(btn => btn.destroy())
    this.choiceButtons = []
    this.choiceBackgrounds = []
    this.currentChoices = []

    this.textSprite.setText(text)
    this.textSprite.setVisible(true)
  }

  private showChoices(choices: DialogueChoice[]): void {
    // #4: the prompt stays visible; choices render below it
    this.currentChoices = choices
    this.selectedChoice = 0

    choices.forEach((choice, i) => {
      const button = this.add.container(120, 120 + i * 50)

      const bg = this.add.rectangle(0, 0, 200, 40, 0x444444)
      const label = this.add.text(0, 0, choice.text, {
        fontSize: "16px",
        color: "#ffffff"
      })
      label.setOrigin(0.5, 0.5)
      button.add([bg, label])

      // #5: containers have no width/height of their own, so an
      // explicit hit area is required for pointerdown to ever fire
      button.setInteractive(
        new Phaser.Geom.Rectangle(-100, -20, 200, 40),
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

  private selectChoice(index: number): void {
    this.selectedChoice = index
    this.choiceBackgrounds.forEach((bg, i) => {
      bg.setFillStyle(i === index ? 0x777777 : 0x444444)
    })
  }

  private makeChoice(choice: DialogueChoice): void {
    if (choice.flag && choice.value !== undefined) {
      this.flags[choice.flag] = choice.value
    }
    this.advance()
  }

  private advance(): void {
    const line = this.currentDialogue[this.currentIndex]
    if (line && line.onComplete) {
      line.onComplete(this.flags)
    }
    this.currentIndex++
    this.showCurrentLine()
  }

  private nextLine(): void {
    this.advance()
  }

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
  }

  handleInput(input: InputSource): void {
    if (!this.isShowing) return

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
        this.endDialogue()
      }
    }
  }
}
