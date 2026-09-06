/**
 * Global tuning constants — screen size, tile size, speeds, and follower spacing.
 * Exports plain numbers only; nothing here is computed or ever changes at runtime.
 * Every module that needs a shared magic number imports from here instead of hardcoding it.
 */
export const GAME_WIDTH = 240
export const GAME_HEIGHT = 240
export const TILE_SIZE = 16
export const WALK_SPEED = 80
export const TRAIL_SIZE = 24
export const FOLLOW_GAP = 16
