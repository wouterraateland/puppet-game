import HeadsUpDisplay from './HeadsUpDisplay'

const GAME_STATE = {
  PLAYING: 'Playing',
  PAUSED: 'paused'
}

export default ({ gameState }) => switch gameState {
  case GAME_STATE.PLAYING: return HeadsUpDisplay
  case GAME_STATE.PAUSED: return null
  default: return null
}
